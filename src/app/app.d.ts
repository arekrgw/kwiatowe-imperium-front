import type { Theme } from "@mui/material/styles";
import { DehydratedState, QueryFunction, QueryKey } from "react-query";
import { RootStore } from "@stores/RootStore";
import { AxiosInstance } from "axios";

declare global {
	interface IDehydratedState {
		dehydratedState: DehydratedState;
	}

	interface Window {
		APP_THEME: Theme;
		APP_STATE: RootStore;
	}

	type QueryDescriptor<T> = (
		APIInstance?: AxiosInstance
	) => [QueryKey, QueryFunction<T>];

	interface Image {
		id: string;
		url: string;
	}

	interface Product {
		id: string;
		name: string;
		description: string;
		price: number;
		images: Image[];
	}
}
