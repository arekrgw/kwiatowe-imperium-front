import { MainStore } from "@stores/MainStore";

export class RootStore {
	mainStore: MainStore;
	constructor() {
		this.mainStore = new MainStore();
	}

	hydrate = (hydrationData: IStoreHydrationData) => {};
}
