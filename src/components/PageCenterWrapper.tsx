import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const PageCenterWrapper = styled(Box)`
	padding: 20px;

	${({ theme }) => theme.breakpoints.up("md")} {
		padding: 40px;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}
`;

export default PageCenterWrapper;
