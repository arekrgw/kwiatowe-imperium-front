import { MainStore } from "@stores/MainStore";
import { NextRouter } from "next/router";
import { QueryClient } from "react-query";

export class RootStore {
	mainStore: MainStore;
	queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
		this.mainStore = new MainStore(this);
	}

	hydrate = (hydrationData: IStoreHydrationData) => {};
}
