import type { Theme } from "@mui/material/styles";
import { DehydratedState } from "react-query";
import { RootStore } from "@stores/RootStore";

declare global {
	interface IDehydratedState {
		dehydratedState: DehydratedState;
	}

	interface Window {
		APP_THEME: Theme;
		APP_STATE: RootStore;
	}
}
