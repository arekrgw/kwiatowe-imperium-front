import { MenuItemSingle } from "@app/menuConfiguration";

export const createCategoriesObject = (
	categories: Category[]
): MenuItemSingle[] => {
	return categories.map((cat) => ({
		__typename: "MenuItemSingle",
		href: `/category/${cat.id}`,
		key: cat.name,
		isTranslatable: false,
		name: cat.name,
	}));
};
