import { createTheme, responsiveFontSizes } from "@mui/material";
import typography from "@styles/typography";
import palette from "@styles/palettle";
import components from "@styles/components";

let theme = createTheme({ typography, components: {} });

theme = responsiveFontSizes(theme);

theme = createTheme(theme, { palette });

theme = createTheme(theme, { ...components(theme) });

export default theme;
