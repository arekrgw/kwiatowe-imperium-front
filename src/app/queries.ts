import { API } from "./api";
import { MenuItemSingle } from "./menuConfiguration";
import { createCategoriesObject } from "./utils/dataUtils";

export const homePageQuery: QueryDescriptor<Product[]> = () => [
	"homepageList",
	async () => {
		const res = await API.getInstance().get<CategoryWithProductsList>(
			"/category/name/homepage"
		);
		return res.data.products;
	},
];

export const productPageQuery: QueryDescriptor<Product, { id: string }> = (
	params
) => [
	["product", params?.id],
	async ({ queryKey }) => {
		const res = await API.getInstance().get<Product>(`/product/${queryKey[1]}`);
		return res.data;
	},
];

export const allProductsQuery: QueryDescriptor<Product[]> = () => [
	"products",
	async () => {
		const res = await API.getInstance().get<Product[]>(`/product/all`);
		return res.data;
	},
];

export const categoriesQuery: QueryDescriptor<MenuItemSingle[]> = () => [
	"categories",
	async () => {
		const res = await API.getInstance().get<Category[]>(`/category/allVisible`);

		return createCategoriesObject(res.data);
	},
];

export const categoryListingQuery: QueryDescriptor<
	CategoryWithProductsList,
	{ id: string }
> = (params) => [
	["category", params?.id],
	async ({ queryKey }) => {
		const res = await API.getInstance().get<CategoryWithProductsList>(
			`/category/${queryKey[1]}`
		);
		return res.data;
	},
];
