import { userProfile } from "@app/queries";
import { useCart } from "@app/utils/cartUtils";
import {
	Alert,
	Box,
	Button,
	Snackbar,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery } from "react-query";

interface CartSummaryProps {}

const CartSummary = () => {
	const { cart, finalizeCart } = useCart();
	const { data: user } = useQuery(...userProfile());
	const intl = useIntl();
	const [openSuccess, setOpenSuccess] = useState(false);

	const handleCloseSnackbar = () => {
		setOpenSuccess(false);
	};

	const handleBuy = async () => {
		try {
			await finalizeCart();
			setOpenSuccess(true);
		} catch (err) {}
	};

	const totalAmountVal = cart.products.reduce(
		(acc, p) => acc + p.quantity * p.product.price,
		0
	);

	const totalAmount = totalAmountVal.toFixed(2);

	return (
		<>
			<Snackbar
				open={openSuccess}
				autoHideDuration={3000}
				onClose={(e, reason) => handleCloseSnackbar()}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={(e) => handleCloseSnackbar()}
					severity="success"
					sx={{ width: "100%" }}
				>
					<FormattedMessage id="cart.success" />
				</Alert>
			</Snackbar>
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
			{user && user.address && user.postalCode && user.city && (
				<>
					<Typography variant="h5" fontWeight="fontWeightMedium" mt="10px">
						<FormattedMessage id="cart.shipment" />
					</Typography>
					<Stack spacing="20px" mt="20px">
						<TextField
							value={user.address}
							disabled
							size="small"
							fullWidth
							label={intl.formatMessage({ id: "profile.details.address" })}
						/>
						<TextField
							value={user.postalCode}
							size="small"
							fullWidth
							disabled
							label={intl.formatMessage({ id: "profile.details.postalCode" })}
						/>
						<TextField
							value={user.city}
							size="small"
							fullWidth
							disabled
							label={intl.formatMessage({ id: "profile.details.city" })}
						/>
					</Stack>
					<Box
						mt="20px"
						display="flex"
						justifyContent="flex-end"
						alignItems="center"
					>
						<Button
							variant="contained"
							disabled={!totalAmountVal}
							onClick={handleBuy}
						>
							<FormattedMessage id="cart.checkout" />
						</Button>
					</Box>
				</>
			)}

			<Box display="flex" justifyContent="flex-end">
				{user && (!user.address || !user.city || !user.postalCode) && (
					<Button variant="contained" disabled sx={{ mt: "20px" }}>
						<FormattedMessage id="cart.cantCheckoutAddr" />
					</Button>
				)}

				{!user && (
					<Button variant="contained" disabled sx={{ mt: "20px" }}>
						<FormattedMessage id="cart.cantCheckout" />
					</Button>
				)}
			</Box>
		</>
	);
};

export default CartSummary;
