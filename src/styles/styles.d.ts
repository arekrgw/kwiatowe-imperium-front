import { Color, Components, PaletteColor } from "@mui/material";

declare global {
	Components;

	type InjectThemeProps = {
		theme: Theme;
	};

	type ComponentConfig<T extends keyof Components> = {
		[Key in T]: Components[Key];
	};

	type ThemeInjectedComponent<T extends keyof Components> =
		| ((props: InjectThemeProps) => ComponentConfig<T>)
		| ComponentConfig<T>;
}

declare module "@mui/material/styles" {
	interface Palette {
		green: Color;
		brown: Color;
		heroPrimary: Palette["primary"];
	}
	interface PaletteOptions {
		green: Color;
		brown: Color;
		heroPrimary: PaletteOptions["primary"];
	}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		heroPrimary: true;
	}
}
