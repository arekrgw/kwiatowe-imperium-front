import { Box, IconButton, Modal, Paper, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { FormattedMessage } from "react-intl";
import ImagePickerForm from "./ImagePickerForm";
import ImageUpload from "./ImageUpload";
import CloseIcon from "@mui/icons-material/Close";

interface ImageLibraryProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setImages: (images: Image[]) => void;
	currentlySelectedImages: Image[];
}

const ImageLibrary: FC<ImageLibraryProps> = ({
	open,
	setOpen,
	setImages,
	currentlySelectedImages,
}) => {
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
					p: "20px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box display="flex" justifyContent="space-between">
					<Typography variant="h4" sx={{ pb: "20px" }}>
						<FormattedMessage id="imagePicker.title" />
					</Typography>
					<Box>
						<IconButton onClick={() => setOpen(false)}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Box>
				<Box flex="1" display="flex" flexDirection="column" gap="10px">
					<Box flexBasis="80%">
						<ImagePickerForm
							setImages={setImages}
							close={() => setOpen(false)}
							currentlySelectedImages={currentlySelectedImages}
						/>
					</Box>
					<Box flexBasis="20%" bgcolor="grey.100" borderRadius="4px">
						<ImageUpload />
					</Box>
				</Box>
			</Paper>
		</Modal>
	);
};

export default ImageLibrary;
