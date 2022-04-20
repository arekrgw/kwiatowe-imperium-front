import { allProductsQuery } from "@app/queries";
import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import { ListingSkeleton } from "@components/Profile";
import ProductListItem from "./ProductListItem";
import EditCreateProductModal from "./EditCreateProductModal";

interface ProductsProps {}

const Products = (props: ProductsProps) => {
	const { data } = useQuery(...allProductsQuery());
	const [newCat, setNewCat] = useState(false);

	if (!data) return <ListingSkeleton />;

	return (
		<>
			<EditCreateProductModal open={newCat} setOpen={setNewCat} />
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
					<FormattedMessage id="products.section.title" />
				</Typography>
				<IconButton onClick={() => setNewCat(true)}>
					<AddIcon />
				</IconButton>
			</Box>
			<Box display="flex" flexDirection="column" gap="10px">
				{data.map((product) => (
					<ProductListItem product={product} key={product.id} />
				))}
			</Box>
		</>
	);
};

export default Products;
