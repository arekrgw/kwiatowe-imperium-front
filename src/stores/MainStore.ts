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
		document.querySelector("body")!.style.overflow = "auto";
	};

	openMenu = () => {
		this.isMenuOpen = true;
		document.querySelector("body")!.style.overflow = "hidden";
	};
}
