import { NextRouter } from "next/router";
import { QueryClient } from "react-query";

export {};

declare global {
	interface IStoreHydrationData {}

	interface IStoreProvider {
		children: ReactNode;
		hydrationData?: IStoreHydrationData;
		queryClient: QueryClient;
	}
}
