import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap, SvgIconProps } from "@mui/material";
import React from "react";

export interface MenuItem {
	name: string;
	href: string;
	Icon?: React.ComponentType<SvgIconProps>;
	extended?: Omit<MenuItem, "extended">[];
}

const menuConfiguration: MenuItem[] = [
	{
		name: "Strona główna",
		href: "/",
		Icon: HomeIcon,
	},
	{
		name: "Rośliny",
		href: "/flowers",
		Icon: LocalFloristIcon,
		extended: [
			{
				name: "Róże",
				href: "/flowers?category=rose",
			},
			{
				name: "Tulipany",
				href: "/flowers?category=tulip",
			},
			{
				name: "Goździki",
				href: "/flowers?category=cloves",
			},
		],
	},
	{
		name: "Konto",
		href: "/account",
		Icon: PersonIcon,
	},
];

export default menuConfiguration;
