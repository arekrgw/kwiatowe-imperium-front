import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import DeleteIcon from "@mui/icons-material/Delete";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { useQueryClient } from "react-query";
import { allImagesQuery } from "@app/queries";

interface ImageUploadProps {}

const ImageUpload: FC<ImageUploadProps> = () => {
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState("");
	const queryClient = useQueryClient();
	const intl = useIntl();
	console.log(file, file?.name);

	const sendFile = async () => {
		if (!file) return;
		setError("");
		try {
			const form = new FormData();
			form.append("file", file);
			form.append("name", file.name);

			await API.getInstance().post(apiRoutes.upload, form);
			setFile(null);
			queryClient.invalidateQueries(allImagesQuery()[0]);
		} catch (err) {
			setError(intl.formatMessage({ id: "imageUpload.uploadError" }));
		}
	};

	return (
		<Stack alignItems="center" height="100%" justifyContent="center">
			{file && (
				<Box display="flex" alignItems="center">
					<Typography>{file.name}</Typography>
					<IconButton onClick={() => setFile(null)}>
						<DeleteIcon />
					</IconButton>
				</Box>
			)}
			<Box display="flex" alignItems="center" gap="10px">
				<Button variant="contained" component="label" htmlFor="upldImg">
					<FormattedMessage id="imageUpload.pickFromDisk" />
					<input
						id="upldImg"
						type="file"
						style={{ display: "none" }}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setFile(event.target.files?.[0] || null);
						}}
						accept=".jpg,.jpeg,.png,.webp"
					/>
				</Button>
				<Button variant="contained" color="secondary" onClick={sendFile}>
					<FormattedMessage id="imageUpload.uploadToServer" />
				</Button>
			</Box>
			{error && (
				<Typography color="error" mt="10px">
					{error}
				</Typography>
			)}
		</Stack>
	);
};

export default ImageUpload;
