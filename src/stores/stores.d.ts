export {};

declare global {
	interface IStoreHydrationData {}

	interface IStoreProvider {
		children: ReactNode;
		hydrationData?: IStoreHydrationData;
	}
}
