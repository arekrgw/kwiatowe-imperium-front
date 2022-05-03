import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { cartQuery, userProfile } from "@app/queries";
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useQuery, useQueryClient } from "react-query";

const CART_KEY = "kw_cart";

function assertFullfilled<T>(
	item: PromiseSettledResult<T>
): item is PromiseFulfilledResult<T> {
	return item.status === "fulfilled";
}

const getLocalCart: () => Cart = () => {
	const cart = localStorage.getItem(CART_KEY);
	if (cart) {
		return { products: JSON.parse(cart) };
	}
	return { products: [] };
};

type CartContext = {
	cart: Cart;
	addToCart: (product: Product, qty: number) => Promise<void>;
};

const defaultCart: Cart = { products: [] };

const CartContext = createContext<CartContext | null>(null);

export const CartContextProvider = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const [initialized, setInitialized] = useState(false);
	const queryClient = useQueryClient();
	const { data: user } = useQuery(...userProfile());
	const { data: localCart, isLoading: isLoadingLocalCart } = useQuery(
		"localCart",
		getLocalCart
	);
	const { data: cart } = useQuery(...cartQuery(), {
		enabled: !!user,
	});

	const isLocalCart = !!localCart?.products.length;
	const isRemoteCart = !!cart?.products.length;

	const addToCart = useCallback(
		async (product: Product, qty: number, noInvalidation: boolean = false) => {
			if (user) {
				try {
					await API.getInstance().post(apiRoutes.cart, {
						product: product.id,
						quantity: qty,
					});

					if (!noInvalidation) {
						queryClient.invalidateQueries(cartQuery()[0]);
						console.log("invalidated");
					}
				} catch (err) {
					console.debug(err);
				}
			} else {
				const cartObj: ProductInCart[] = [
					...(localCart?.products || []),
					{ product, quantity: qty },
				];
				localStorage.setItem(CART_KEY, JSON.stringify(cartObj));
				queryClient.invalidateQueries("localCart");
			}
		},
		[queryClient, user, localCart]
	);

	const moveLocalCartToUser = async () => {
		if (isLocalCart) {
			await Promise.allSettled(
				localCart.products.map((p) => addToCart(p.product, p.quantity, true))
			);

			localStorage.removeItem(CART_KEY);
			queryClient.invalidateQueries({
				predicate: (q) =>
					q.queryKey[0] === "localCart" || q.queryKey[0] === cartQuery()[0],
			});
		}
	};

	useEffect(() => {
		if (!isRemoteCart && isLocalCart && user) {
			moveLocalCartToUser();
		}
		if (user && isRemoteCart) {
			localStorage.removeItem(CART_KEY);
			queryClient.invalidateQueries("localCart");
		}
	}, [user]);

	const validateSavedProducts = async () => {
		if (isLocalCart) {
			const res = await Promise.allSettled(
				localCart.products.map((p) =>
					API.getInstance().get<Product>(apiRoutes.product(p?.product?.id))
				)
			);

			let validProducts = res.filter(assertFullfilled).map((p) => p.value.data);
			// FIXME:
			validProducts = validProducts.filter((p) => p);
			// FIXME!
			console.log(validProducts, res);
			const validCart = validProducts.map((vP) => ({
				product: vP,
				quantity: localCart.products.find((p) => p.product.id === vP.id)!
					.quantity,
			}));

			localStorage.setItem(CART_KEY, JSON.stringify(validCart));
			queryClient.invalidateQueries("localCart");
		}
	};

	useEffect(() => {
		if (!isLoadingLocalCart && !initialized) {
			setInitialized(true);
			validateSavedProducts();
		}
	}, [isLoadingLocalCart]);

	return (
		<CartContext.Provider
			value={{
				cart: (!!isLocalCart ? localCart : cart) || defaultCart,
				addToCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartContextProvider");
	}
	return context;
}
