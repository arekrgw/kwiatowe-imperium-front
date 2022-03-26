import { DefaultOptions, QueryClient } from "react-query";
import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";
import { categoriesQuery } from "./queries";

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
			baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
		});
	}

	public static getInstance() {
		if (this.instance) {
			return this.instance.axiosInstance;
		}

		this.instance = new API();

		return this.instance.axiosInstance;
	}

	public static setAcceptLanguageHeader(lang: string) {
		const instance = this.getInstance();

		instance.defaults.headers.common["Accept-Language"] = lang;
	}
}

export const prepareApi = (ctx: GetServerSidePropsContext) => {
	API.setAcceptLanguageHeader(ctx.locale!);
	const client = getQueryClient();

	const promises = [client.prefetchQuery(...categoriesQuery())];

	return [client, promises] as const;
};
