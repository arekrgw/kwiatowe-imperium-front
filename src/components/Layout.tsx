import Box from "@mui/material/Box";
import { FC } from "react";
import { NavBar } from "@components/NavBar";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<Box>
			<NavBar />
			{children}
		</Box>
	);
};

export default Layout;
