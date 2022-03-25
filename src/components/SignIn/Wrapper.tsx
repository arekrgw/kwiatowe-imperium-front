import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

interface WrapperProps {
	title: string;
}

const Wrapper: FC<WrapperProps> = ({ children, title }) => {
	return (
		<Paper elevation={0} sx={{ p: "20px" }}>
			<Typography
				component="h1"
				sx={(theme) => ({
					fontSize: "h4.fontSize",
					// [theme.breakpoints.up("md")]: {
					// 	fontSize: "h4.fontSize",
					// },
				})}
			>
				<FormattedMessage id={title} />
				<Box>{children}</Box>
			</Typography>
		</Paper>
	);
};

export default Wrapper;
