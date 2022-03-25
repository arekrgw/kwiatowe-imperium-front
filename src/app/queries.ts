import { API } from "./api";
import { MenuItemSingle } from "./menuConfiguration";
import { createCategoriesObject } from "./utils/dataUtils";

export const homePageQuery: QueryDescriptor<Product[]> = (
	APIInstance = API.getInstance()
) => [
	"homepageList",
	async () => {
		const res = await APIInstance.get<Product[]>("/product/all");
		return res.data;
	},
];

export const productPageQuery: QueryDescriptor<Product, { id: string }> = (
	APIInstance = API.getInstance(),
	params
) => [
	["product", params?.id],
	async ({ queryKey }) => {
		const res = await APIInstance.get<Product>(`/product/${queryKey[1]}`);
		return res.data;
	},
];

export const categoriesQuery: QueryDescriptor<MenuItemSingle[]> = (
	APIInstance = API.getInstance()
) => [
	"categories",
	async () => {
		const res = await APIInstance.get<Category[]>(`/category/all`);

		return createCategoriesObject(res.data);
	},
];
