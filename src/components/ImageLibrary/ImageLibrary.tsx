import { allImagesQuery } from "@app/queries";
import { Box, Grid, Modal, Paper, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import ImageCheckbox from "./ImageCheckbox";
import ImagePickerForm from "./ImagePickerForm";

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
					p: "20px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box>
					<Typography variant="h4" sx={{ pb: "20px" }}>
						<FormattedMessage id="imagePicker.title" />
					</Typography>
				</Box>
				<Box sx={{ height: "80%" }}>
					<ImagePickerForm />
				</Box>
				<Box sx={{ height: "20%" }}>
					<Box>asdasdaasasdasdasdasd</Box>
				</Box>
			</Paper>
		</Modal>
	);
};

export default ImageLibrary;
