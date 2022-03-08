import { makeAutoObservable } from "mobx";

export class MainStore {
	isMenuOpen = false;

	constructor() {
		makeAutoObservable(this);
	}

	hideMenu = () => {
		this.isMenuOpen = false;
	};

	openMenu = () => {
		this.isMenuOpen = true;
	};
}
