import { makeAutoObservable } from "mobx";

export class MainStore {
	film = "Harry potter";
	constructor() {
		makeAutoObservable(this);
	}
}
