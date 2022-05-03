import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ButtonLink from "@components/ButtonLink";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { cartQuery } from "@app/queries";
import { useCart } from "@app/utils/cartUtils";

const CartButton = () => {
	const { cart } = useCart();

	return (
		<Badge badgeContent={cart.products.length} color="primary">
			<ButtonLink
				size="small"
				color="secondary"
				variant="contained"
				sx={{
					backgroundColor: "green.900",
					minWidth: "unset",
					"& .MuiButton-startIcon": { margin: 0 },
				}}
				href="/cart"
				startIcon={<ShoppingCartIcon />}
			/>
		</Badge>
	);
};

export default CartButton;
