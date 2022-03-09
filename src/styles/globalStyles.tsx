import { useTheme } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";

export const GlobalStyle = () => {
	const theme = useTheme();
	return (
		<GlobalStyles
			styles={`
        body {
          background-color: ${theme.palette.grey[200]};
          min-height: 100vh;
          padding-top: 60px;

          ${theme.breakpoints.up("sm")} {
            padding-top: 0;
          }
        }

      `}
		/>
	);
};
