import type { Theme } from "@mui/material/styles";
import { DehydratedState, QueryFunction, QueryKey } from "react-query";
import { RootStore } from "@stores/RootStore";
import { AxiosInstance } from "axios";

declare global {
	interface IDehydratedState {
		dehydratedState: DehydratedState;
	}

	interface Window {
		APP_THEME: Theme;
		APP_STATE: RootStore;
	}

	type QueryDescriptor<T, K = unknown> = (
		params?: K
	) => [QueryKey, QueryFunction<T>];

	interface Image {
		id: string;
		url: string;
	}

	interface Product {
		id: string;
		name: string;
		description: string;
		price: number;
		images: Image[];
	}

	interface ProductEdit {
		namePl: string;
		nameEn: string;
		descriptionPl: string;
		descriptionEn: string;
		price: number;
		images: Image[];
	}

	interface Category {
		id: string;
		name: string;
		_visible: boolean;
	}

	interface LoginResponse {
		jwt: string;
	}

	interface Role {
		id: string;
		name: string;
	}
	interface User {
		username: string;
		email: string;
		name: string;
		surname: string;
		roles: Role[];
	}

	interface Hero {
		id: string;
		image: Image;
		title: string;
		subtitle: string;
		buttonText: string;
		category: Pick<Category, "id">;
	}

	interface HeroEdit {
		titleEn: string;
		titlePl: string;
		subtitleEn: string;
		subtitlePl: string;
		buttonTextEn: string;
		buttonTextPl: string;
		image: Image | null;
		category: Category;
	}

	interface CategoryEdit {
		namePl: string;
		nameEn: string;
		_visible: boolean;
	}

	interface CategoryWithProductsList extends Category {
		products: Product[];
	}

	interface ITab {
		label: string;
		value: string;
		adminOnly?: true;
	}
}
