import { ordersQuery } from "@app/queries";
import { useQuery, useQueryClient } from "react-query";
import ListingSkeleton from "@components/Profile/ListingSkeleton";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";

interface OrdersProps {}

const Orders = () => {
	const { data } = useQuery(...ordersQuery());
	const queryClient = useQueryClient();

	const finializeOrder = async (id: string) => {
		try {
			await API.getInstance().delete(apiRoutes.orderFinalizeAdmin(id));
			queryClient.invalidateQueries(ordersQuery()[0]);
		} catch (err) {
			console.debug(err);
		}
	};

	if (!data) return <ListingSkeleton />;

	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				pb="20px"
			>
				<Typography
					component="h1"
					sx={(theme) => ({
						fontSize: "h4.fontSize",
					})}
				>
					<FormattedMessage id="orders.orders" />
				</Typography>
			</Box>
			<Box display="flex" flexDirection="column" gap="10px">
				{data.map((order) => (
					<Box
						key={order.id}
						component={Paper}
						display="flex"
						gap="15px"
						height="70px"
						alignItems="center"
						px="15px"
					>
						<Box
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								flex: 1,
							}}
						>
							<FormattedMessage id="orders.order" /> #{order.id}
						</Box>

						<Box flex="0 1 auto">
							<Button onClick={() => finializeOrder(order.id)}>
								<FormattedMessage id="orders.finalize" />
							</Button>
						</Box>
					</Box>
				))}
			</Box>
		</>
	);
};

export default Orders;
