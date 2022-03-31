import { DefaultOptions, QueryClient } from "react-query";
import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";
import { categoriesQuery, userProfile } from "./queries";
import { getJwt } from "./auth";

export const getQueryClient = (defaultOptions?: DefaultOptions) => {
	return new QueryClient({
		defaultOptions: { queries: { staleTime: 1000 * 5 } },
		...defaultOptions,
	});
};

export class API {
	private static instance: API;
	private axiosInstance: AxiosInstance;

	private constructor() {
		this.axiosInstance = axios.create({
			baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
		});

		this.axiosInstance.defaults.headers.common["Content-Type"] =
			"application/json";

		this.axiosInstance.interceptors.request.use((config) => {
			if (typeof window !== "undefined") {
				if (!config?.headers) throw new Error("Intercetors config is invalid");
				const jwt = getJwt();
				config.headers["Authorization"] = `Bearer ${jwt}`;
			}

			return config;
		});
	}

	public static getInstance() {
		if (this.instance) {
			return this.instance.axiosInstance;
		}

		this.instance = new API();

		return this.instance.axiosInstance;
	}

	public static setAuthHeader(ctx: GetServerSidePropsContext) {
		const jwt = getJwt(ctx);

		const instance = this.getInstance();

		instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
	}

	public static setAcceptLanguageHeader(lang: string) {
		const instance = this.getInstance();

		instance.defaults.headers.common["Accept-Language"] = lang;
	}
}

export const prepareApi = (ctx: GetServerSidePropsContext) => {
	API.setAcceptLanguageHeader(ctx.locale!);
	API.setAuthHeader(ctx);
	const client = getQueryClient();

	const user = client.fetchQuery(...userProfile());

	const promises = [client.prefetchQuery(...categoriesQuery())];

	const awaitAll = () => Promise.all([...promises, user]);

	return [client, promises, user, awaitAll] as const;
};
