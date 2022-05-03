import { prepareApi } from "@app/api";
import { useCart } from "@app/utils/cartUtils";
import { CartComponent } from "@components/Cart";
import PageCenterWrapper from "@components/PageCenterWrapper";
import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { FormattedMessage } from "react-intl";
import { dehydrate } from "react-query";

interface CartProps {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const [queryClient, , , awaitAll] = prepareApi(ctx);

	await awaitAll();

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const Cart = () => {
	const { cart } = useCart();
	return (
		<PageCenterWrapper>
			<Typography variant="h4" component="h1">
				<FormattedMessage
					id="yourCart"
					values={{ count: cart.products.length }}
				/>
			</Typography>

			<CartComponent />
		</PageCenterWrapper>
	);
};

export default Cart;
