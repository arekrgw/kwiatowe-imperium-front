import menuConfiguration from "@app/menuConfiguration";
import { Stack } from "@mui/material";
import DesktopMenuItem from "./DesktopMenuItem";
import ProfileButton from "./ProfileButton";

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
		</Stack>
	);
};

export default DesktopMenu;
