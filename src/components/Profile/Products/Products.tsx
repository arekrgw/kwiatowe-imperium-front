import { allProductsQuery } from "@app/queries";
import { Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import AddIcon from "@mui/icons-material/Add";
import { ListingSkeleton } from "@components/Profile";
import ProductListItem from "./ProductListItem";
import EditCreateProductModal from "./EditCreateProductModal";
import { useRouter } from "next/router";
import Pagination from "@components/Pagination";

interface ProductsProps {}

const Products = (props: ProductsProps) => {
	const { query, push } = useRouter();
	const page = Number(query.page);
	const { data } = useQuery(...allProductsQuery({ page: page - 1 }));
	const [newCat, setNewCat] = useState(false);

	const handlePageChange = (page: number) => {
		push({ pathname: "/profile", query: { section: "products", page } });
	};

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
				{data.data.map((product) => (
					<ProductListItem product={product} key={product.id} />
				))}
			</Box>
			<Box display="flex" justifyContent="center" mt="30px">
				<Pagination
					count={data.count}
					page={page}
					onChange={handlePageChange}
				/>
			</Box>
		</>
	);
};

export default Products;
