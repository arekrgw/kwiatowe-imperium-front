import { Box, Paper, Typography } from "@mui/material";
import Image from "@components/Image";
import { FormattedMessage } from "react-intl";

interface ProductProps {
	product: Product;
}

const Product = ({ product }: ProductProps) => {
	const { images, name, price } = product;
	return (
		<Paper
			sx={(theme) => ({
				display: "flex",
				flexDirection: "column",
				borderColor: "brown.200",
				height: "100%",
				cursor: "pointer",
				transition: theme.transitions.create(["transform", "box-shadow"]),
				"&:hover": {
					boxShadow: 5,
					transform: "translateY(-3px)",
				},
			})}
		>
			<Image
				src={images.length ? images[0].url : "/image-placeholder.png"}
				alt={`${name}-image`}
				sx={(theme) => ({
					objectFit: "cover",
					height: "180px",
					width: "100%",
					borderRadius: "4px 4px 0 0",
					[theme.breakpoints.up("sm")]: {
						height: "220px",
					},
					[theme.breakpoints.up("md")]: {
						height: "250px",
					},
				})}
			/>

			<Box mt="10px" p="10px" display="flex" flexDirection="column">
				<Typography variant="h6" component="h2">
					{name}
				</Typography>
				<Box display="flex" alignItems="center" mt="10px">
					<Typography>
						<FormattedMessage id="price" />:
					</Typography>
					<Typography
						sx={{ ml: "5px" }}
						variant="h6"
						fontWeight="fontWeightMedium"
						color="secondary.main"
					>
						{price}
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default Product;
