import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
export class MainStore {
	parentStore: RootStore;
	isMenuOpen = false;

	constructor(parentStore: RootStore) {
		makeAutoObservable(this);
		this.parentStore = parentStore;
	}

	hideMenu = () => {
		this.isMenuOpen = false;
	};

	openMenu = () => {
		this.isMenuOpen = true;
	};
}
