import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect } from "react";
import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
	const router = useRouter();
	const { mainStore } = useStore();

	return (
		<Box
			component={Paper}
			elevation={2}
			sx={(theme) => ({
				position: "fixed",
				top: 0,
				left: 0,
				background: `linear-gradient(to bottom, ${theme.palette.green[600]}, ${theme.palette.green[800]})`,
				width: "100%",
				borderRadius: 0,
				color: "secondary.contrastText",
				height: "60px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 98,
				[theme.breakpoints.up("sm")]: {
					position: "static",
					justifyContent: "space-between",
					px: "20px",
				},
			})}
		>
			<Logo />
			<MobileMenuButton />
			<MobileMenu />
			<DesktopMenu />
		</Box>
	);
};

export default observer(NavBar);
