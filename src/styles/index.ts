import { createTheme, responsiveFontSizes } from "@mui/material";
import typography from "@styles/typography";

let theme = createTheme({ typography });

theme = responsiveFontSizes(theme);

export default theme;
