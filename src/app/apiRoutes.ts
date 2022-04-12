const apiRoutes = {
	login: "/auth/authenticate",
	register: "/auth/register",
	homepageProducts: "/api/category/name/homepage",
	product: (id: string) => `/api/product/${id}`,
	products: "/api/product/all",
	categories: "/api/category/allVisible",
	category: (id: string) => `/api/category/${id}`,
	userProfile: "/auth/me",
	passwordChange: "/auth/me/passwordChange",
	hero: "/api/hero",
	allImages: "/api/image/all",
	upload: "/api/image/db",
};

export default apiRoutes;
