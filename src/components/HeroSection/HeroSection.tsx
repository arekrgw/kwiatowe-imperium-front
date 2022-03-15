import {
	Box,
	Button,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

interface HeroSectionProps {}

const HeroSection = () => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				background: "url(/springback.jpeg)",
				backgroundSize: "cover",
				p: "50px 50px",
				color: "#ffffff",
				[theme.breakpoints.up("sm")]: {
					height: "600px",
				},
			})}
		>
			<Box
				display="flex"
				alignItems="center"
				flexDirection="column"
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<Typography
					fontWeight="fontWeightBold"
					variant="h1"
					textAlign="center"
					mb="10px"
				>
					Wiosna nadchodzi!
				</Typography>
				<Typography fontWeight="fontWeightMedium" textAlign="center">
					Zadbaj o swoje otoczenie i spraw sobie nowe rośliny!
				</Typography>
				<Button
					variant="outlined"
					color="heroPrimary"
					size={isDesktop ? "large" : "medium"}
					sx={{ mt: "50px" }}
				>
					Zobacz więcej!
				</Button>
			</Box>
		</Box>
	);
};

export default HeroSection;
