import { Components, Theme } from "@mui/material";
import MuiButton from "@styles/components/Button";

function injectTheme(props: InjectThemeProps) {
	return <T extends keyof Components>(component: ThemeInjectedComponent<T>) => {
		if (typeof component === "function") {
			return component(props);
		}

		return component;
	};
}

const components = (theme: Theme): { components: Components } => {
	const inject = injectTheme({ theme });
	return {
		components: {
			...inject(MuiButton),
		},
	};
};

export default components;
