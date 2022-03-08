import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { FC } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
	return (
		<Box
			component={Paper}
			elevation={2}
			sx={(theme) => ({
				background: `linear-gradient(to bottom, ${theme.palette.green[600]}, ${theme.palette.green[800]})`,
				width: "100%",
				borderRadius: 0,
				color: "secondary.contrastText",
				height: "60px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			})}
		>
			<Logo />
			<MobileMenuButton />
			<MobileMenu />
		</Box>
	);
};

export default NavBar;
