import { Box, Grid, Paper } from "@mui/material";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

interface CartComponentProps {}

const CartComponent = () => {
	return (
		<Box
			sx={(theme) => ({
				mt: "20px",
				[theme.breakpoints.up("md")]: {
					mt: "40px",
				},
			})}
		>
			<Grid container spacing="10px">
				<Grid item xs={12} md={8}>
					<Paper sx={{ p: "20px" }}>
						<CartList />
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper sx={{ p: "20px" }}>
						<CartSummary />
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default CartComponent;
