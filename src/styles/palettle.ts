import { PaletteOptions } from "@mui/material";
import { brown, green } from "@mui/material/colors";

const palette: Partial<PaletteOptions> = {
	secondary: {
		...green,
		main: green[700],
		dark: green[800],
		light: green[600],
		contrastText: "#fff",
	},
	primary: {
		...brown,
		main: brown[700],
		dark: brown[800],
		light: brown[600],
		contrastText: "#fff",
	},
};

export default palette;
