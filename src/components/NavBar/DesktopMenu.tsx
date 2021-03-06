import menuConfiguration from "@app/menuConfiguration";
import { Stack } from "@mui/material";
import CartButton from "./CartButton";
import DesktopMenuItem from "./DesktopMenuItem";
import ProfileButton from "./ProfileButton";
import SearchButton from "./SearchButton";

interface DesktopMenuProps {}

const DesktopMenu = (props: DesktopMenuProps) => {
	return (
		<Stack
			direction="row"
			spacing="10px"
			sx={(theme) => ({
				display: "none",
				[theme.breakpoints.up("sm")]: { display: "flex" },
			})}
		>
			{menuConfiguration.map((item) => (
				<DesktopMenuItem key={item.key} menuItem={item} />
			))}
			<ProfileButton />
			<CartButton />
			<SearchButton />
		</Stack>
	);
};

export default DesktopMenu;
