import Box from "@mui/material/Box";
import { FC } from "react";
import { NavBar } from "@components/NavBar";
import { Footer } from "./Footer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<Box minHeight="100vh" display="flex" flexDirection="column">
			<NavBar />
			<Box flex="2" display="flex" flexDirection="column">
				{children}
			</Box>
			<Footer />
		</Box>
	);
};

export default Layout;
