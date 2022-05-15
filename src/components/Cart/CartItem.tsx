import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useCart } from "@app/utils/cartUtils";

interface CartItemProps {
	productInCart: ProductInCart;
}

const CartItem = ({ productInCart: { product, quantity } }: CartItemProps) => {
	const [deleting, setDeleting] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { deleteItemFromCart } = useCart();
	const removeFromCart = async (id: string) => {
		setDeleting(true);
		await deleteItemFromCart(id);
		if (mounted) setDeleting(false);
	};

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				gap: "10px",
				p: { xs: "15px 5px", md: "15px 15px" },
				alignItems: "center",
				borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
				"&:last-of-type": {
					borderBottom: "none",
				},
			}}
		>
			<Box
				sx={{
					position: "relative",
					flex: "0 0 40px",
					height: "40px",
					borderRadius: "4px",
					overflow: "hidden",
				}}
			>
				<Image
					src={
						product.images.length
							? product.images[0].url
							: "/image-placeholder.png"
					}
					alt={`${product.name} image`}
					layout="fill"
					objectFit="contain"
				/>
			</Box>
			<Box
				sx={{
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					flex: "1 1 80%",
				}}
			>
				{product.name}
			</Box>
			<Box
				sx={{
					whiteSpace: "nowrap",
					flex: "1 1 30%",
				}}
			>
				{quantity} x {product.price}
			</Box>
			<Box sx={{}}>
				<IconButton
					disabled={deleting}
					onClick={() => removeFromCart(product.id)}
				>
					<CloseIcon sx={{ color: "error.main" }} />
				</IconButton>
			</Box>
		</Box>
	);
};

export default CartItem;
