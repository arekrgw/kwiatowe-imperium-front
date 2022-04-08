import { Modal, Paper } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

interface ImageLibraryProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const ImageLibrary: FC<ImageLibraryProps> = ({ open, setOpen }) => {
	return (
		<Modal open={open} onClose={(_, reason) => setOpen(false)}>
			<Paper
				sx={{
					position: "absolute",
					width: "1200px",
					maxWidth: "95vw",
					height: "1000px",
					maxHeight: "90vh",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				asdsa
			</Paper>
		</Modal>
	);
};

export default ImageLibrary;
