import Image from "@components/Image";
import PageCenterWrapper from "@components/PageCenterWrapper";
import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface NotFoundPageProps {}

const NotFoundPage = () => {
	return (
		<PageCenterWrapper sx={{ flex: 1 }}>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				flex="1"
			>
				<Image src="/logo404.png" alt="404-logo" sx={{ maxHeight: "60px" }} />
				<Typography>
					<FormattedMessage id="notFound" />
				</Typography>
			</Box>
		</PageCenterWrapper>
	);
};

export default NotFoundPage;
