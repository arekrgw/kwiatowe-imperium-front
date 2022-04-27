import { DialogContent, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CategoryEditForm from "./CategoryEditForm";

interface EditCreateCategoryModalProps {
	open: boolean;
	categoryId?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditCreateCategoryModal = ({
	open,
	setOpen,
	categoryId,
}: EditCreateCategoryModalProps) => {
	return (
		<Modal open={open} onClose={(_, reason) => setOpen(false)}>
			<DialogContent>
				<CategoryEditForm setOpen={setOpen} categoryId={categoryId} />
			</DialogContent>
		</Modal>
	);
};

export default EditCreateCategoryModal;
