import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";

interface ProductListProps {
	products: Product[] | undefined;
	isLoading: boolean;
}

const ProductList = ({ products, isLoading }: ProductListProps) => {
	if (isLoading || !products) {
		return (
			<Grid container spacing="15px">
				{Array(12)
					.fill(1)
					.map((_, i) => (
						<Grid item xs={6} key={i} sm={4} md={3}>
							<ProductSkeleton />
						</Grid>
					))}
			</Grid>
		);
	}

	return (
		<Grid container spacing="15px">
			{products.map((product) => (
				<Grid item xs={6} key={product.id} sm={4} md={3}>
					<Product product={product} />
				</Grid>
			))}
		</Grid>
	);
};

export default observer(ProductList);
