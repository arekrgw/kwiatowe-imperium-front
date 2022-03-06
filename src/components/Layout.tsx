import Box from "@mui/material/Box";
import { FC } from "react";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
	return <Box sx={{ backgroundColor: "grey.300" }}>{children}</Box>;
};

export default Layout;
