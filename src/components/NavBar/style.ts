import { Box, styled } from "@mui/material";

export const ExtendedMenuContent = styled(Box)`
	padding: 25px;
	background-color: ${({ theme }) => theme.palette.grey[200]};
	border-radius: 5px;
	color: #000;
	min-width: 400px;
	box-shadow: ${({ theme }) => theme.shadows[3]};
`;
