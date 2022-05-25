import {
	allProductsQuery,
	allUsers,
	calendarQueryAll,
	categoriesQueryAll,
	heroEditQuery,
	ordersQuery,
} from "@app/queries";

export const tabQueryMapping = {
	hero: heroEditQuery,
	categories: categoriesQueryAll,
	products: allProductsQuery,
	users: allUsers,
	orders: ordersQuery,
	calendar: calendarQueryAll,
} as const;

export const TABS_MAPPING: ITab[] = [
	{ label: "profile.tab.details", value: "details" },
	{ label: "profile.tab.orders", value: "orders", adminOnly: true },
	{ label: "profile.tab.calendar", value: "calendar" },
	{ label: "profile.tab.products", value: "products", adminOnly: true },
	{ label: "profile.tab.categories", value: "categories", adminOnly: true },
	{ label: "profile.tab.hero", value: "hero", adminOnly: true },
	{ label: "profile.tab.users", value: "users", adminOnly: true },
];
