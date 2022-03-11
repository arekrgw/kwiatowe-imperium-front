import { MenuItem } from "@app/menuConfiguration";
import ButtonLink from "@components/ButtonLink";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface DesktopMenuItemProps {
	menuItem: MenuItem;
}

const DesktopMenuItem = ({ menuItem }: DesktopMenuItemProps) => {
	return (
		<ButtonLink
			variant="contained"
			size="small"
			color="secondary"
			sx={{ backgroundColor: "green.900" }}
			key={menuItem.href}
			href={menuItem.href}
			startIcon={menuItem.Icon ? <menuItem.Icon /> : undefined}
			endIcon={menuItem.extended ? <ArrowDropDownIcon /> : undefined}
		>
			{menuItem.name}
		</ButtonLink>
	);
};

export default DesktopMenuItem;
