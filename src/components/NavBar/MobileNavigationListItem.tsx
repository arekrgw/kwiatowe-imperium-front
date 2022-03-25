import { MenuItem } from "@app/menuConfiguration";
import { FC, useState } from "react";
import ListItemButtonLink from "@components/ListItemButtonLink";
import {
	alpha,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SxProps,
	Theme,
	Typography,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FormattedMessage } from "react-intl";
import ExtendedMenuCategories from "./ExtendedMenuCategories";

interface MobileNavigationListItemProps {
	menuItem: MenuItem;
}

type SharedSx = (theme: Theme) => SystemStyleObject<Theme>;

export const sharedSx: SharedSx = (theme) => ({
	backgroundColor: "green.700",
	"&:hover": {
		backgroundColor: alpha(theme.palette.green[700], 0.7),
	},
	color: "secondary.contrastText",
	mt: "10px",
	"&:first-of-type": { mt: 0 },
	borderRadius: "5px",
});

const MobileNavigationListItem: FC<MobileNavigationListItemProps> = ({
	menuItem,
}) => {
	const { mainStore } = useStore();
	const [open, setOpen] = useState(false);

	if (menuItem.__typename === "MenuItemSingle") {
		return (
			<ListItemButtonLink
				sx={sharedSx}
				href={menuItem.href}
				onClick={mainStore.hideMenu}
			>
				{menuItem.Icon && (
					<ListItemIcon
						sx={{ color: "secondary.contrastText", minWidth: "40px" }}
					>
						<menuItem.Icon />
					</ListItemIcon>
				)}
				<ListItemText
					primary={
						<Typography variant="h6">
							<FormattedMessage id={menuItem.name} />
						</Typography>
					}
				/>
			</ListItemButtonLink>
		);
	}

	const Icon = menuItem.extended && (open ? ExpandLess : ExpandMore);

	return (
		<>
			<ListItemButton sx={sharedSx} onClick={() => setOpen(!open)}>
				{menuItem.Icon && (
					<ListItemIcon
						sx={{ color: "secondary.contrastText", minWidth: "40px" }}
					>
						<menuItem.Icon />
					</ListItemIcon>
				)}
				<ListItemText
					primary={
						<Typography variant="h6">
							<FormattedMessage id={menuItem.name} />
						</Typography>
					}
				/>
				{Icon && <Icon />}
			</ListItemButton>
			<Collapse in={open} timeout={300}>
				{menuItem.name === "menu.flowers" && (
					<ExtendedMenuCategories isMobile item={menuItem} />
				)}
			</Collapse>
		</>
	);
};

export default observer(MobileNavigationListItem);
