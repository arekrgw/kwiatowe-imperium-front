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
				})}
			>
				<FormattedMessage id={title} />
			</Typography>
			<Box>{children}</Box>
		</Paper>
	);
};

export default Wrapper;
