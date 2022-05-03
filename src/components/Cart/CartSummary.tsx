import { userProfile } from "@app/queries";
import { useCart } from "@app/utils/cartUtils";
import { Box, Button, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

interface CartSummaryProps {}

const CartSummary = () => {
	const { cart } = useCart();
	const { data: user } = useQuery(...userProfile());

	const totalAmount = cart.products
		.reduce((acc, p) => acc + p.quantity * p.product.price, 0)
		.toFixed(2);

	return (
		<>
			<Typography variant="h5" fontWeight="fontWeightMedium">
				<FormattedMessage id="cart.summary" />
			</Typography>
			<Box
				sx={{
					mt: "20px",
					pb: "20px",
					borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
				}}
			>
				{cart.products.map((p) => (
					<Box key={p.product.id} display="flex" justifyContent="space-between">
						<Typography textAlign="left">
							{p.quantity} x {p.product.price}
						</Typography>
						<Typography textAlign="right">
							{p.quantity * p.product.price}
						</Typography>
					</Box>
				))}
			</Box>
			<Box
				mt="20px"
				display="flex"
				justifyContent="flex-end"
				alignItems="center"
			>
				<Typography sx={{ mr: "20px" }}>
					<FormattedMessage id="cart.total" />
				</Typography>
				<Typography variant="h5" fontWeight="fontWeightMedium">
					{totalAmount}
				</Typography>
			</Box>
			<Box
				mt="20px"
				display="flex"
				justifyContent="flex-end"
				alignItems="center"
			>
				{user ? (
					<Button variant="contained" disabled={!totalAmount}>
						<FormattedMessage id="cart.checkout" />
					</Button>
				) : (
					<Button variant="contained" disabled>
						<FormattedMessage id="cart.cantCheckout" />
					</Button>
				)}
			</Box>
		</>
	);
};

export default CartSummary;
