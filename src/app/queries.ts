import { API } from "@app/api";
import { MenuItemSingle } from "@app/menuConfiguration";
import { createCategoriesObject } from "@app/utils/dataUtils";
import axios from "axios";
import apiRoutes from "./apiRoutes";

export const homePageQuery: QueryDescriptor<Product[]> = () => [
	"homepageList",
	async () => {
		const res = await API.getInstance().get<CategoryWithProductsList>(
			apiRoutes.homepageProducts
		);
		return res.data.products;
	},
];

export const productPageQuery: QueryDescriptor<Product, { id: string }> = (
	params
) => [
	["product", params?.id],
	async ({ queryKey }) => {
		const res = await API.getInstance().get<Product>(
			apiRoutes.product(queryKey[1] as string)
		);
		return res.data;
	},
];

export const allProductsQuery: QueryDescriptor<Product[]> = () => [
	"products",
	async () => {
		const res = await API.getInstance().get<Product[]>(apiRoutes.products);
		return res.data;
	},
];

export const categoriesQuery: QueryDescriptor<MenuItemSingle[]> = () => [
	"categories",
	async () => {
		const res = await API.getInstance().get<Category[]>(apiRoutes.categories);

		return createCategoriesObject(res.data);
	},
];

export const categoriesQueryAll: QueryDescriptor<Category[]> = () => [
	"categoriesAll",
	async () => {
		const res = await API.getInstance().get<Category[]>(
			apiRoutes.categoriesAll
		);

		return res.data;
	},
];

export const categoryListingQuery: QueryDescriptor<
	CategoryWithProductsList,
	{ id: string }
> = (params) => [
	["category", params?.id],
	async ({ queryKey }) => {
		const res = await API.getInstance().get<CategoryWithProductsList>(
			apiRoutes.category(queryKey[1] as string)
		);
		return res.data;
	},
];

export const userProfile: QueryDescriptor<User | null> = () => [
	"userProfile",
	async () => {
		try {
			const res = await API.getInstance().get<User>(apiRoutes.userProfile);

			return res.data;
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (
					Number(err.response?.status) === 403 ||
					Number(err.response?.status) === 400
				) {
					return null;
				}
			}
			throw err;
		}
	},
];

export const heroSectionQuery: QueryDescriptor<Hero> = () => [
	"heroSection",
	async () => {
		const res = await API.getInstance().get<Hero>(apiRoutes.hero);
		return res.data;
	},
];

export const heroEditQuery: QueryDescriptor<HeroEdit> = () => [
	"heroEdit",
	async () => {
		const res = await API.getInstance().get<HeroEdit>(apiRoutes.heroFull);
		return res.data;
	},
];

export const allImagesQuery: QueryDescriptor<Image[]> = () => [
	"allImages",
	async () => {
		const res = await API.getInstance().get<Image[]>(apiRoutes.allImages);
		return res.data;
	},
];

export const cartQuery: QueryDescriptor<Cart> = () => [
	"cart",
	async () => {
		const res = await API.getInstance().get<Cart>(apiRoutes.cart);
		return res.data;
	},
];
