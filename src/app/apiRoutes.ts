const apiRoutes = {
	login: "/auth/authenticate",
	register: "/auth/register",
	homepageProducts: "/api/category/name/homepage",
	product: (id: string) => `/api/product/${id}`,
	products: "/api/product/all",
	categories: "/api/category/allVisible",
	category: (id: string) => `/api/category/${id}`,
	userProfile: "/auth/me",
};

export default apiRoutes;
