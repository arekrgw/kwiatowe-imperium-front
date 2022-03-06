import { MainStore } from "@stores/MainStore";
import { QueryClient } from "react-query";

export class RootStore {
	mainStore: MainStore;
	queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.mainStore = new MainStore();
		this.queryClient = queryClient;
	}

	hydrate = (hydrationData: IStoreHydrationData) => {};
}
