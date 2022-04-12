import { Box, Paper } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

interface ImageCheckboxProps {
	img: Image;
	value: boolean;
	onChange: (id: string) => void;
}

const ImageCheckbox: FC<ImageCheckboxProps> = ({ img, value, onChange }) => {
	return (
		<Paper
			sx={(theme) => ({
				border: value
					? `2px solid ${theme.palette.green[200]}`
					: `2px solid ${theme.palette.grey[200]}`,
				cursor: "pointer",
			})}
			onClick={() => onChange(img.id)}
			variant="outlined"
		>
			<Box sx={{ position: "relative", width: "100%", height: "150px" }}>
				<Image
					layout="fill"
					objectFit="contain"
					src={img.url}
					alt="img-gallery"
				/>
			</Box>
		</Paper>
	);
};

export default ImageCheckbox;
