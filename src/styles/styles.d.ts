import { Components } from "@mui/material";

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
