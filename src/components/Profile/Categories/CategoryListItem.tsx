import { Box, Paper, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import EditCreateCategoryModal from "./EditCreateCategoryModal";
import { useState } from "react";
import DeleteButtonWithWarn from "@components/DeleteButtonWithWarn";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { useQueryClient } from "react-query";
import { categoriesQuery, categoriesQueryAll } from "@app/queries";

interface CategoryListItemProps {
	category: Category;
}

const CategoryListItem = ({ category }: CategoryListItemProps) => {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleDeleteItem = async () => {
		try {
			await API.getInstance().delete(apiRoutes.categoryDelete(category.id));
			queryClient.invalidateQueries(categoriesQueryAll()[0]);
			queryClient.invalidateQueries(categoriesQuery()[0]);
		} catch (err) {
			console.debug("category delete failed");
		}
	};

	return (
		<>
			<EditCreateCategoryModal
				categoryId={category.id}
				open={open}
				setOpen={setOpen}
			/>
			<Box
				component={Paper}
				display="flex"
				gap="10px"
				p="15px"
				alignItems="center"
			>
				<Box flex="1 1 80%">{category.name}</Box>
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

export default CategoryListItem;
