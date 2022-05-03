import Fab from "@mui/material/Fab";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { Badge } from "@mui/material";
import { cartQuery } from "@app/queries";
import { useQuery } from "react-query";
import Link from "next/link";
import { useCart } from "@app/utils/cartUtils";

interface MobileCartButtonProps {}

const MobileCartButton = (props: MobileCartButtonProps) => {
	const { cart } = useCart();

	return (
		<Box
			sx={(theme) => ({
				position: "fixed",
				bottom: "86px",
				right: "15px",
				zIndex: 98,
				[theme.breakpoints.up("sm")]: { display: "none" },
			})}
		>
			<Link href="/cart" passHref>
				<Fab variant="circular" color="secondary">
					<Badge badgeContent={cart.products.length} color="primary">
						<ShoppingCartIcon />
					</Badge>
				</Fab>
			</Link>
		</Box>
	);
};

export default observer(MobileCartButton);
