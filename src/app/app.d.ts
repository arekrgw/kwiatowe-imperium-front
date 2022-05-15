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
		categories: Category[];
		images: Image[];
	}

	interface ProductEdit {
		namePl: string;
		nameEn: string;
		descriptionPl: string;
		descriptionEn: string;
		price: number;
		images: Image[];
		categories: Category[];
	}

	interface Category {
		id: string;
		name: string;
		visible: boolean;
	}

	interface LoginResponse {
		jwt: string;
	}

	interface Role {
		id: string;
		name: string;
	}
	interface User {
		id: string;
		username: string;
		email: string;
		name: string;
		surname: string;
		roles: Role[];
		address: string;
		city: string;
		postalCode: string;
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
		visible: boolean;
	}

	interface CategoryWithProductsList extends Category {
		products: Product[];
	}

	interface ITab {
		label: string;
		value: string;
		adminOnly?: true;
	}

	interface ProductInCart {
		product: Product;
		quantity: number;
	}

	interface Cart {
		products: ProductInCart[];
	}

	interface Order {
		products: ProductInCart[];
		id: string;
		ordered: boolean;
	}

	interface Pageable<T> {
		count: number;
		data: T[];
	}
}
