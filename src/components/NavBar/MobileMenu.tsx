import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import Slide from "@mui/material/Slide";
import { Fade } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import MobileNavigationList from "./MobileNavigationList";

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = () => {
	const { mainStore } = useStore();
	const handlers = useSwipeable({ onSwipedLeft: mainStore.hideMenu });
	return (
		<Box
			sx={(theme) => ({ [theme.breakpoints.up("sm")]: { display: "none" } })}
		>
			<Fade timeout={300} in={mainStore.isMenuOpen}>
				<Box
					onClick={mainStore.hideMenu}
					sx={{
						zIndex: "99",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						width: "100vw",
						height: "100vh",
						top: 0,
						position: "fixed",
						left: 0,
					}}
				></Box>
			</Fade>
			<Slide
				direction="right"
				in={mainStore.isMenuOpen}
				timeout={300}
				unmountOnExit
			>
				<Box
					component={Paper}
					elevation={4}
					sx={{
						backgroundColor: "green.800",
						height: "100vh",
						borderRadius: 0,
						width: "90vw",
						position: "fixed",
						top: 0,
						left: 0,
						zIndex: "100",
					}}
					{...handlers}
				>
					<MobileNavigationList />
				</Box>
			</Slide>
		</Box>
	);
};

export default observer(MobileMenu);
