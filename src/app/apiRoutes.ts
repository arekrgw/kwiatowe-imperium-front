export const PAGE_SIZE = 5;

const apiRoutes = {
	login: "/auth/authenticate",
	register: "/auth/register",
	homepageProducts: "/api/product/all?page=0&size=100&catName=homepage",
	product: (id: string) => `/api/product/${id}`,
	productDelete: (id: string) => `/api/product/${id}`,
	products: (page: number) => `/api/product/all?page=${page}&size=${PAGE_SIZE}`,
	productsSearch: (page: number, q: string) =>
		`/api/product/all?page=${page}&size=${PAGE_SIZE}&q=${q}`,
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
	cartFinalize: "/cart/buy",
	cartDelete: (id: string) => `/cart/${id}`,
	productFull: (id: string) => `/api/product/full/${id}`,
	productCreate: "/api/product",
	productUpdate: (id: string) => `/api/product/${id}`,
	categoryFull: (id: string) => `/api/category/full/${id}`,
	categoryUpdate: (id: string) => `/api/category/${id}`,
	categoryCreate: `/api/category`,
	usersDelete: (id: string) => `/users/${id}`,
	allUsers: `/users/all`,
	orders: `/api/cart`,
	orderFinalizeAdmin: (id: string) => `/api/cart/${id}`,
	calendarAll: "/auth/me/mail",
	dateDelete: (id: string) => `/auth/me/mail/${id}`,
	dateCreate: `/auth/me/mail`,
};

export default apiRoutes;
