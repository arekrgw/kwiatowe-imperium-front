import { allImagesQuery } from "@app/queries";
import { Box, Button, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import ImageCheckbox from "./ImageCheckbox";
import ImagesSkeleton from "./ImagesSkeleton";

interface ImagePickerFormProps {
	setImages: (images: Image[]) => void;
	close: () => void;
	currentlySelectedImages: Image[];
	multiple: boolean;
}

const ImagePickerForm: FC<ImagePickerFormProps> = ({
	setImages,
	close,
	multiple,
	currentlySelectedImages,
}) => {
	const { data } = useQuery(...allImagesQuery());

	const [selectedImages, setSelectedImages] = useState<string[]>(
		currentlySelectedImages.map(({ id }) => id)
	);

	useEffect(() => {
		setSelectedImages(currentlySelectedImages.map(({ id }) => id));
	}, [currentlySelectedImages]);

	const onImageSelect = (imageId: string) => {
		if (multiple) {
			if (selectedImages.includes(imageId)) {
				setSelectedImages(selectedImages.filter((id) => id !== imageId));
			} else {
				setSelectedImages([...selectedImages, imageId]);
			}
		} else {
			setSelectedImages([imageId]);
		}
	};

	return (
		<Box display="flex" flexDirection="column" width="100%" height="100%">
			<Box sx={{ flex: "1 0 0", overflowY: "auto" }}>
				<Grid container spacing="10px">
					{data ? (
						data.map((img) => (
							<Grid item xs={6} sm={4} md={3} lg={2} key={img.id}>
								<ImageCheckbox
									img={img}
									value={selectedImages.includes(img.id)}
									onChange={onImageSelect}
								/>
							</Grid>
						))
					) : (
						<ImagesSkeleton />
					)}
				</Grid>
			</Box>

			<Box
				display="flex"
				justifyContent="flex-end"
				alignItems="flex-start"
				pt="20px"
			>
				<Button
					type="submit"
					variant="contained"
					disabled={!selectedImages.length}
					onClick={() => {
						if (data) {
							setImages(data.filter((img) => selectedImages.includes(img.id)));
							close();
						}
					}}
				>
					<FormattedMessage id="imagePicker.pickImages" />
				</Button>
			</Box>
		</Box>
	);
};

export default ImagePickerForm;
