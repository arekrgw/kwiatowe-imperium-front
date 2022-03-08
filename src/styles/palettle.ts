import { PaletteOptions } from "@mui/material";
import { brown, green } from "@mui/material/colors";

const palette: PaletteOptions = {
	secondary: {
		main: green[700],
		dark: green[800],
		light: green[600],
		contrastText: "#fff",
	},
	primary: {
		main: brown[700],
		dark: brown[800],
		light: brown[600],
		contrastText: "#fff",
	},
	brown,
	green,
};

export default palette;
