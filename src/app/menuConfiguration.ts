import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HomeIcon from "@mui/icons-material/Home";
import { SvgIconProps } from "@mui/material";
import React from "react";

export interface MenuItemSingle {
	__typename: "MenuItemSingle";
	key: string;
	name: string;
	href: string;
	isTranslatable: boolean;
	Icon?: React.ComponentType<SvgIconProps>;
}

export interface MenuItemExtended
	extends Omit<MenuItemSingle, "href" | "__typename"> {
	__typename: "MenuItemExtended";
	extended: MenuItemSingle[];
}

export type MenuItem = MenuItemSingle | MenuItemExtended;

const menuConfiguration: MenuItem[] = [
	{
		__typename: "MenuItemSingle",
		name: "menu.home",
		href: "/",
		key: "home",
		isTranslatable: true,
		Icon: HomeIcon,
	},
	{
		__typename: "MenuItemExtended",
		name: "menu.flowers",
		key: "flowers",
		isTranslatable: true,
		Icon: LocalFloristIcon,
		extended: [
			{
				__typename: "MenuItemSingle",
				key: "fulloffer",
				name: "menu.fulloffer",
				isTranslatable: true,
				href: "/category",
			},
		],
	},
];

export default menuConfiguration;
