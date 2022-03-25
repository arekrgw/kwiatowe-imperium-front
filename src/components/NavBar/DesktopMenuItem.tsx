import { MenuItem } from "@app/menuConfiguration";
import ButtonLink from "@components/ButtonLink";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "@mui/material";
import {
	usePopupState,
	bindHover,
	bindPopover,
} from "material-ui-popup-state/hooks";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { FormattedMessage } from "react-intl";
import ExtendedMenuCategories from "./ExtendedMenuCategories";

interface DesktopMenuItemProps {
	menuItem: MenuItem;
}

const DesktopMenuItem = ({ menuItem }: DesktopMenuItemProps) => {
	const popupState = usePopupState({
		variant: "popover",
		popupId: menuItem.key,
	});

	if (menuItem.__typename === "MenuItemSingle")
		return (
			<ButtonLink
				variant="contained"
				size="small"
				color="secondary"
				sx={{ backgroundColor: "green.900" }}
				key={menuItem.href}
				href={menuItem.href}
				startIcon={menuItem.Icon ? <menuItem.Icon /> : undefined}
			>
				<FormattedMessage id={menuItem.name} />
			</ButtonLink>
		);

	return (
		<>
			<Button
				variant="contained"
				size="small"
				color="secondary"
				sx={{ backgroundColor: "green.900" }}
				startIcon={menuItem.Icon ? <menuItem.Icon /> : undefined}
				endIcon={menuItem.extended ? <ArrowDropDownIcon /> : undefined}
				{...bindHover(popupState)}
			>
				<FormattedMessage id={menuItem.name} />
			</Button>
			<HoverPopover
				{...bindPopover(popupState)}
				PaperProps={{
					sx: {
						pt: "5px",
						background: "transparent",
						boxShadow: "none",
						overflow: "unset",
					},
				}}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
				disableScrollLock
			>
				{menuItem.name === "menu.flowers" && (
					<ExtendedMenuCategories item={menuItem} />
				)}
			</HoverPopover>
		</>
	);
};

export default DesktopMenuItem;
