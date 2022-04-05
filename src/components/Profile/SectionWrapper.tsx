import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

interface SectionWrapperProps {
	title: string;
	buttonRight?: React.ReactElement;
}

const SectionWrapper: FC<SectionWrapperProps> = ({
	children,
	title,
	buttonRight,
}) => {
	return (
		<Paper elevation={1} sx={{ p: "20px" }}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography
					component="h1"
					sx={(theme) => ({
						fontSize: "h4.fontSize",
					})}
				>
					<FormattedMessage id={title} />
				</Typography>
				{buttonRight && buttonRight}
			</Box>
			{children}
		</Paper>
	);
};

export default SectionWrapper;
