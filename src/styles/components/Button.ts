const MuiButton: ThemeInjectedComponent<"MuiButton"> = ({ theme }) => ({
	MuiButton: {
		defaultProps: { disableElevation: true },
		styleOverrides: {
			root: {
				textTransform: "none",
			},
		},
	},
});

export default MuiButton;
