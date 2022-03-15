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
