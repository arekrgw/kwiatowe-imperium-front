import {
	Box,
	Button,
	IconButton,
	Paper,
	Typography,
	Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormattedMessage } from "react-intl";
import { useState } from "react";

interface DeleteButtonWithWarnProps {
	onConfirm: () => void;
}

const DeleteButtonWithWarn = ({ onConfirm }: DeleteButtonWithWarnProps) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Modal open={open} onClose={(_, reason) => setOpen(false)}>
				<Paper
					sx={{
						position: "absolute",
						width: "600px",
						maxWidth: "95vw",
						maxHeight: "90vh",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						p: "20px",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography sx={{ pb: "20px" }}>
						<FormattedMessage id="deleteWarn.title" />
					</Typography>
					<Box display="flex" gap="10px">
						<Button
							variant="outlined"
							fullWidth
							color="primary"
							onClick={() => setOpen(false)}
						>
							<FormattedMessage id="deleteWarn.cancel" />
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => {
								onConfirm();
								setOpen(false);
							}}
							fullWidth
						>
							<FormattedMessage id="deleteWarn.confirm" />
						</Button>
					</Box>
				</Paper>
			</Modal>
			<IconButton onClick={() => setOpen(true)}>
				<DeleteIcon />
			</IconButton>
		</>
	);
};

export default DeleteButtonWithWarn;
