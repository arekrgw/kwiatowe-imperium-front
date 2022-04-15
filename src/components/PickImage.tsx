import { IconButton } from "@mui/material";
import {
	FocusEventHandler,
	forwardRef,
	MouseEventHandler,
	useState,
} from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { ImageLibrary } from "@components/ImageLibrary";
import { Box } from "@mui/system";
import Image from "next/image";

interface PickImageProps {
	value: Image | Image[] | null;
	onChange: (img: Image | Image[] | null) => void;
	onBlur: MouseEventHandler<HTMLButtonElement>;
	name: string;
}

function isArrayImage(value: Image | Image[] | null): value is Image[] {
	return (value as Image[])?.length !== undefined;
}

const ImagePreview = ({
	img,
	offset,
	zIndex,
}: {
	img: Image;
	offset: string;
	zIndex: number;
}) => {
	return (
		<Box
			sx={{
				position: "relative",
				height: "70px",
				width: "70px",
				ml: offset || "0px",
				border: "1px solid",
				borderColor: "grey.800",
				backgroundColor: "grey.300",
				boxShadow: 3,
				borderRadius: "4px",
				transform: "rotateY(30deg)",
				zIndex,
			}}
		>
			<Image src={img.url} layout="fill" alt={img.url} objectFit="contain" />
		</Box>
	);
};

const PickImage = forwardRef<HTMLInputElement, PickImageProps>(
	({ value, onChange, onBlur, name }, ref) => {
		const [open, setOpen] = useState(false);

		const handleSelected = (imgs: Image[]) => {
			if (isArrayImage(value)) {
				onChange(imgs);
			} else {
				onChange(imgs[0] || null);
			}
		};

		return (
			<>
				<ImageLibrary
					open={open}
					setOpen={setOpen}
					setImages={handleSelected}
					multiple={isArrayImage(value)}
					currentlySelectedImages={
						isArrayImage(value) ? value : value ? [value] : []
					}
				/>
				<Box display="flex" justifyContent="flex-start" alignItems="center">
					<Box
						display="flex"
						sx={{
							perspective: "1000px",
							perspectiveOrigin: "50% 50%",
						}}
					>
						{value &&
							isArrayImage(value) &&
							value.map((img, index) => (
								<ImagePreview
									key={img.id}
									img={img}
									offset={index ? "-20px" : "0px"}
									zIndex={index}
								/>
							))}
						{value && !isArrayImage(value) && (
							<ImagePreview img={value} offset="0px" zIndex={0} />
						)}
					</Box>
					<Box>
						<IconButton
							name={name}
							onClick={(e) => {
								setOpen(true);
								onBlur(e);
							}}
						>
							<PhotoLibraryIcon />
						</IconButton>
					</Box>
				</Box>
			</>
		);
	}
);

PickImage.displayName = "PickImage";

export default PickImage;
