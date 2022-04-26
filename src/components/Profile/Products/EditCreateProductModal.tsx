import { DialogContent, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import ProductEditForm from "./ProductEditForm";

interface EditCreateProductModalProps {
	open: boolean;
	productId?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditCreateProductModal = ({
	productId,
	open,
	setOpen,
}: EditCreateProductModalProps) => {
	return (
		<Modal open={open} onClose={(_, reason) => setOpen(false)}>
			<DialogContent>
				<ProductEditForm productId={productId} setOpen={setOpen} />
			</DialogContent>
		</Modal>
	);
};

export default EditCreateProductModal;
