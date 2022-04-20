import { Box, IconButton, Paper } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { allProductsQuery } from "@app/queries";
import DeleteButtonWithWarn from "@components/DeleteButtonWithWarn";
import { useState } from "react";
import { useQueryClient } from "react-query";
import EditCreateProductModal from "./EditCreateProductModal";
import Image from "next/image";

interface ProductListItemProps {
	product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleDeleteItem = async () => {
		try {
			await API.getInstance().delete(apiRoutes.productDelete(product.id));
			queryClient.invalidateQueries(allProductsQuery()[0]);
		} catch (err) {
			console.debug("product delete failed");
		}
	};

	return (
		<>
			<EditCreateProductModal
				productId={product.id}
				open={open}
				setOpen={setOpen}
			/>
			<Box
				component={Paper}
				display="flex"
				gap="15px"
				height="70px"
				alignItems="center"
				px="15px"
			>
				<Box
					sx={{
						position: "relative",
						flex: "0 0 40px",
						height: "40px",
						borderRadius: "4px",
						overflow: "hidden",
					}}
				>
					<Image
						src={
							product.images.length
								? product.images[0].url
								: "/image-placeholder.png"
						}
						alt={`${product.name} image`}
						layout="fill"
						objectFit="contain"
					/>
				</Box>
				<Box flex="1 1 30%">{product.name}</Box>
				<Box
					flex="1 1 40%"
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					{product.description}
				</Box>
				<Box flex="0 1 auto">
					<Box display="flex">
						<IconButton onClick={() => setOpen(true)}>
							<CreateIcon />
						</IconButton>
						<DeleteButtonWithWarn onConfirm={handleDeleteItem} />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ProductListItem;
