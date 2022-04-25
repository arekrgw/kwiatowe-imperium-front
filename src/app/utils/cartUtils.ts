import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { cartQuery } from "@app/queries";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "react-query";

export function useCart() {
	const queryClient = useQueryClient();
	const { data: cart } = useQuery(...cartQuery());

	const addToCart = useCallback(
		async (productId: string | number, qty: number) => {
			try {
				await API.getInstance().post(apiRoutes.cart, {
					product: productId,
					quantity: qty,
				});

				queryClient.invalidateQueries(cartQuery()[0]);
			} catch (err) {
				console.debug(err);
			}
		},
		[queryClient]
	);

	return { cart, addToCart };
}
