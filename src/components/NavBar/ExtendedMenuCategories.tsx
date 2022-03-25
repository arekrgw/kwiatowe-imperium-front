import { MenuItemExtended, MenuItemSingle } from "@app/menuConfiguration";
import { Stack, Typography, Box } from "@mui/material";
import Link from "@components/Link";
import { ExtendedMenuContent } from "./style";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { categoriesQuery } from "@app/queries";
import { useMemo } from "react";
import ExtendedMenuBox from "./ExtendedMenuBox";
import MobileNavigationItemRenderer from "./MobileNavigationItemRenderer";

interface ExtendedMenuProps {
	item: MenuItemExtended;
	isMobile?: boolean;
}

const ExtendedMenuCategories = ({ item, isMobile }: ExtendedMenuProps) => {
	const { data } = useQuery(...categoriesQuery());

	const finalItems = useMemo(
		() => [...item.extended, ...(data || [])],
		[data, item.extended]
	);

	return isMobile ? (
		<MobileNavigationItemRenderer items={finalItems} />
	) : (
		<ExtendedMenuBox items={finalItems} title="menu.categories" />
	);
};

export default ExtendedMenuCategories;
