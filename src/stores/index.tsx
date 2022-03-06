import { createContext, useContext } from "react";
import { RootStore } from "@stores/RootStore";
import { QueryClient } from "react-query";

let store: RootStore;

const initializeStore = (
	queryClient: QueryClient,
	hydrationData?: IStoreHydrationData
): RootStore => {
	const _store = store ?? new RootStore(queryClient);

	if (hydrationData) {
		_store.hydrate(hydrationData);
	}

	if (typeof window === "undefined") return _store;

	if (!store) store = _store;

	return _store;
};

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({
	children,
	hydrationData,
	queryClient,
}: IStoreProvider) => {
	const store = initializeStore(queryClient, hydrationData);
	if (typeof window !== "undefined") window.APP_STATE = store;

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};

export const useStore = () => {
	const store = useContext(StoreContext);

	if (!store) throw new Error("No store context");

	return store;
};
