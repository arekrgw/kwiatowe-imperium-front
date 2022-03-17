const MuiSkeleton: ThemeInjectedComponent<"MuiSkeleton"> = ({ theme }) => ({
	MuiSkeleton: {
		styleOverrides: {
			root: {
				borderRadius: "5px",
				backgroundColor: theme.palette.brown[100],
			},
		},
	},
});

export default MuiSkeleton;
