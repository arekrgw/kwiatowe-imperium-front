import { API, getQueryClient } from "@app/api";
import createEmotionCache from "@app/createEmotionCache";
import Layout from "@components/Layout";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { StoreProvider } from "@stores";
import theme from "@styles";
import { GlobalStyle } from "@styles/globalStyles";
import { enableStaticRendering } from "mobx-react-lite";
import type { NextComponentType } from "next";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import en from "@translations/en.json";
import pl from "@translations/pl.json";

enableStaticRendering(typeof window === "undefined");
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppLayoutProps {
	emotionCache?: EmotionCache;
	hydrationData?: IStoreHydrationData;
}

if (typeof window !== "undefined") {
	window.APP_THEME = theme;
}

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
	props: MyAppProps
) => {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
		hydrationData,
	} = props;
	const [queryClient] = useState(getQueryClient);
	const router = useRouter();

	const [shortLocale] = router.locale ? router.locale.split("-") : ["en"];

	useEffect(() => {
		API.setAcceptLanguageHeader(shortLocale);
	}, [shortLocale]);

	const messages = useMemo(() => {
		if (shortLocale === "en") return en;
		return pl;
	}, [shortLocale]);

	const getLayout = Component.getLayout;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<meta name="theme-color" content={theme.palette.secondary.main} />
				<meta name="description" content={messages["meta.description"]} />
				<title>Kwiatowe Imperium</title>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyle />
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<StoreProvider
							hydrationData={hydrationData}
							queryClient={queryClient}
						>
							<IntlProvider messages={messages} locale={shortLocale}>
								{getLayout ? (
									getLayout(<Component {...pageProps} />)
								) : (
									<Layout>
										<Component {...pageProps} />
									</Layout>
								)}
							</IntlProvider>
						</StoreProvider>
						<ReactQueryDevtools />
					</Hydrate>
				</QueryClientProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MyApp;
