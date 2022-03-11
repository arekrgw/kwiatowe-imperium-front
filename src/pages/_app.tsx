import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import Head from "next/head";
import theme from "@styles";
import createEmotionCache from "@app/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getQueryClient } from "@app/api";
import { StoreProvider } from "@stores";
import { enableStaticRendering } from "mobx-react-lite";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import { GlobalStyle } from "@styles/globalStyles";

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

	const getLayout = Component.getLayout;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<meta name="theme-color" content={theme.palette.secondary.main} />
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
							{getLayout ? (
								getLayout(<Component {...pageProps} />)
							) : (
								<Layout>
									<Component {...pageProps} />
								</Layout>
							)}
						</StoreProvider>
						<ReactQueryDevtools />
					</Hydrate>
				</QueryClientProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MyApp;
