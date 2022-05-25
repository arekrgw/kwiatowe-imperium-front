import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import DateEditForm from "./DateEditForm";

interface EditCreateDateModalProps {
	open: boolean;
	dateId?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditCreateDateModal = ({
	open,
	setOpen,
	dateId,
}: EditCreateDateModalProps) => {
	return (
		<Modal open={open} onClose={(_, reason) => setOpen(false)}>
			<Box>
				<DateEditForm setOpen={setOpen} dateId={dateId} />
			</Box>
		</Modal>
	);
};

export default EditCreateDateModal;
