const apiRoutes = {
	login: "/auth/authenticate",
	register: "/auth/register",
	homepageProducts: "/api/category/name/homepage",
	product: (id: string) => `/api/product/${id}`,
	productDelete: (id: string) => `/api/product/${id}`,
	products: "/api/product/all",
	categories: "/api/category/allVisible",
	categoriesAll: "/api/category/all",
	category: (id: string) => `/api/category/${id}`,
	categoryDelete: (id: string) => `/api/category/${id}`,
	categoryCreate: `/api/category`,
	userProfile: "/auth/me",
	passwordChange: "/auth/me/passwordChange",
	hero: "/api/hero",
	heroFull: "/api/hero/full",
	updateHero: "api/hero",
	allImages: "/api/image/all",
	upload: "/api/image/db",
};

export default apiRoutes;
