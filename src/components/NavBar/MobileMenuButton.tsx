import Fab from "@mui/material/Fab";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Box from "@mui/material/Box";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";

interface MobileMenuButtonProps {}

const MobileMenuButton = (props: MobileMenuButtonProps) => {
	const { mainStore } = useStore();
	return (
		<Box
			sx={(theme) => ({
				position: "fixed",
				bottom: "15px",
				right: "15px",
				zIndex: 98,
				[theme.breakpoints.up("sm")]: { display: "none" },
			})}
		>
			<Fab variant="circular" color="secondary" onClick={mainStore.openMenu}>
				<MenuOpenIcon />
			</Fab>
		</Box>
	);
};

export default observer(MobileMenuButton);
