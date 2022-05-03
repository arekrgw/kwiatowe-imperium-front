import { useCart } from "@app/utils/cartUtils";
import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import CartItem from "./CartItem";

interface CartListProps {}

const CartList = () => {
	const { cart } = useCart();
	return (
		<Box>
			<Typography
				variant="h5"
				fontWeight="fontWeightMedium"
				sx={{ mb: "20px" }}
			>
				<FormattedMessage id="cart.products" />
			</Typography>
			{!cart.products.length && (
				<Typography component="h5" textAlign="center">
					<FormattedMessage id="cart.empty" />
				</Typography>
			)}
			{cart.products.map((p) => (
				<CartItem key={p.product.id} productInCart={p} />
			))}
		</Box>
	);
};

export default CartList;
