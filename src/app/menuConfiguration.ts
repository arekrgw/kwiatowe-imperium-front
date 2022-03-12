import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { SvgIconProps } from "@mui/material";
import React from "react";

export interface MenuItemSingle {
	__typename: "MenuItemSingle";
	key: string;
	name: string;
	href: string;
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
		Icon: HomeIcon,
	},
	{
		__typename: "MenuItemExtended",
		name: "menu.flowers",
		key: "flowers",
		Icon: LocalFloristIcon,
		extended: [
			{
				__typename: "MenuItemSingle",
				key: "fulloffer",
				name: "Pełna oferta",
				href: "/flowers",
			},
			{
				__typename: "MenuItemSingle",
				key: "roses",
				name: "Róże",
				href: "/flowers?category=rose",
			},
			{
				__typename: "MenuItemSingle",
				key: "tulips",
				name: "Tulipany",
				href: "/flowers?category=tulip",
			},
			{
				__typename: "MenuItemSingle",
				key: "cloves",
				name: "Goździki",
				href: "/flowers?category=cloves",
			},
			{
				__typename: "MenuItemSingle",
				key: "gerbers",
				name: "Gerbery",
				href: "/flowers?category=gerbers",
			},
			{
				__typename: "MenuItemSingle",
				key: "pots",
				name: "Rośliny doniczkowe",
				href: "/flowers?category=pots",
			},
			{
				__typename: "MenuItemSingle",
				key: "garden",
				name: "Rośliny ogrodowe",
				href: "/flowers?category=garden",
			},
		],
	},
	{
		__typename: "MenuItemSingle",
		key: "acc",
		name: "menu.account",
		href: "/account",
		Icon: PersonIcon,
	},
];

export default menuConfiguration;
