import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "@styles";
import createEmotionCache from "@app/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getQueryClient } from "@app/api";
import { StoreProvider } from "@stores";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	hydrationData?: IStoreHydrationData;
}

if (typeof window !== "undefined") {
	window.APP_THEME = theme;
}

const queryClient = getQueryClient();

function MyApp(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
		hydrationData,
	} = props;
	// const [queryClient] = useState(getQueryClient);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<StoreProvider hydrationData={hydrationData}>
							<Component {...pageProps} />
						</StoreProvider>
						<ReactQueryDevtools />
					</Hydrate>
				</QueryClientProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
