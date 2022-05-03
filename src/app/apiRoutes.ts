export const PAGE_SIZE = 5;

const apiRoutes = {
	login: "/auth/authenticate",
	register: "/auth/register",
	homepageProducts: "/api/product/all?page=0&size=100&catName=homepage",
	product: (id: string) => `/api/product/${id}`,
	productDelete: (id: string) => `/api/product/${id}`,
	products: (page: number) => `/api/product/all?page=${page}&size=${PAGE_SIZE}`,
	categories: "/api/category/allVisible",
	categoriesAll: "/api/category/all",
	category: (id: string) => `/api/category/${id}`,
	productByCategory: (id: string, page: number) =>
		`/api/product/all?cat=${id}&page=${page}&size=${PAGE_SIZE}`,
	categoryDelete: (id: string) => `/api/category/${id}`,
	userProfile: "/auth/me",
	passwordChange: "/auth/me/passwordChange",
	hero: "/api/hero",
	heroFull: "/api/hero/full",
	updateHero: "api/hero",
	allImages: "/api/image/all",
	upload: "/api/image/db",
	cart: "/cart",
	cartDelete: "/cart",
	productFull: (id: string) => `/api/product/full/${id}`,
	productCreate: "/api/product",
	productUpdate: (id: string) => `/api/product/${id}`,
	categoryFull: (id: string) => `/api/category/full/${id}`,
	categoryUpdate: (id: string) => `/api/category/${id}`,
	categoryCreate: `/api/category`,
	usersDelete: (id: string) => `/api/user/${id}`,
	allUsers: `/api/user/all`,
};

export default apiRoutes;
