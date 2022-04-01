import { heroSectionQuery } from "@app/queries";
import ButtonLink from "@components/ButtonLink";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useQuery } from "react-query";

const HeroSection = () => {
	const { data } = useQuery(...heroSectionQuery());
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				position: "relative",
				p: "50px 50px",
				color: "#ffffff",
				[theme.breakpoints.up("sm")]: {
					height: "600px",
				},
			})}
		>
			{data && (
				<>
					<Image
						src={data.image}
						layout="fill"
						alt="hero-section-background"
						objectFit="cover"
						priority
					/>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
							justifyContent: "center",
							height: "100%",
							position: "relative",
							zIndex: 1,
						}}
					>
						<Typography
							fontWeight="fontWeightBold"
							variant="h1"
							textAlign="center"
							mb="10px"
						>
							{data.title}
						</Typography>
						<Typography fontWeight="fontWeightMedium" textAlign="center">
							{data.subtitle}
						</Typography>
						<ButtonLink
							variant="outlined"
							color="heroPrimary"
							href={`/category/${data.categoryId}`}
							size={isDesktop ? "large" : "medium"}
							sx={{ mt: "50px" }}
						>
							{data.buttonText}
						</ButtonLink>
					</Box>
				</>
			)}
		</Box>
	);
};

export default HeroSection;
