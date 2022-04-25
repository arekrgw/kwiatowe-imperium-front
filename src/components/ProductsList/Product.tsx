import { Box, Button, Paper, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "@app/utils/cartUtils";
interface ProductProps {
	product: Product;
}

const Product = ({ product }: ProductProps) => {
	const { addToCart } = useCart();

	const { images, name, price, id } = product;
	return (
		<Link href={`/product/${id}`} passHref>
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
				<Box
					sx={(theme) => ({
						position: "relative",
						height: "70vw",
						width: "100%",
						borderRadius: "4px 4px 0 0",
						overflow: "hidden",
						backgroundColor: "brown.100",
						[theme.breakpoints.up("sm")]: {
							height: "50vw",
						},
						[theme.breakpoints.up("md")]: {
							height: "250px",
						},
					})}
				>
					<Image
						src={images.length ? images[0].url : "/image-placeholder.png"}
						alt={`${name}-image`}
						layout="fill"
						objectFit="contain"
					/>
				</Box>
				<Box
					sx={(theme) => ({
						p: "10px",
						display: "flex",
						flexDirection: "column",
						borderTop: `1px solid ${theme.palette.grey[300]}`,
					})}
				>
					<Typography
						sx={(theme) => ({
							fontSize: "h4.fontSize",
							[theme.breakpoints.up("md")]: { fontSize: "h5.fontSize" },
						})}
						component="h2"
						fontWeight="fontWeightMedium"
					>
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
							{price.toFixed(2)} PLN
						</Typography>
					</Box>
					<Button
						startIcon={<AddShoppingCartIcon />}
						variant="contained"
						onClick={(e) => {
							e.stopPropagation();
							addToCart(product.id, 1);
						}}
						sx={{ mt: "10px" }}
					>
						<FormattedMessage id="product.addToCart" />
					</Button>
				</Box>
			</Paper>
		</Link>
	);
};

export default Product;
