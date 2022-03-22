import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const PageCenterWrapper = styled(Box)`
	padding: 20px;
	display: flex;
	flex-direction: column;

	${({ theme }) => theme.breakpoints.up("md")} {
		padding: 40px;
		width: 100%;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
`;

export default PageCenterWrapper;
