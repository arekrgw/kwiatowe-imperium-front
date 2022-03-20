import { API } from "./api";

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
