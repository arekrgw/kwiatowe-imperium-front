import { IconButton } from "@mui/material";
import { forwardRef, MouseEventHandler, useMemo, useState } from "react";
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

const MAX_PREVIEW_IMAGES = 3;

const ImagePreview = ({
	img,
	offset,
	zIndex,
	more,
}: {
	img?: Image;
	more?: number;
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
			{more && (
				<Box
					height="100%"
					width="100%"
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					+{more}
				</Box>
			)}
			{img && (
				<Image src={img.url} layout="fill" alt={img.url} objectFit="contain" />
			)}
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

		const previewImagesArr = useMemo(
			() =>
				value && isArrayImage(value)
					? {
							imgs: value.slice(0, MAX_PREVIEW_IMAGES),
							hiddenCount: value.length - MAX_PREVIEW_IMAGES,
					  }
					: null,
			[value]
		);

		const currentlySelectedImages = useMemo(
			() => (isArrayImage(value) ? value : value ? [value] : []),
			[value]
		);

		return (
			<>
				<ImageLibrary
					open={open}
					setOpen={setOpen}
					setImages={handleSelected}
					multiple={isArrayImage(value)}
					currentlySelectedImages={currentlySelectedImages}
				/>
				<Box display="flex" justifyContent="flex-start" alignItems="center">
					<Box
						display="flex"
						sx={{
							perspective: "1000px",
							perspectiveOrigin: "50% 50%",
						}}
					>
						{previewImagesArr && (
							<>
								{previewImagesArr.imgs.map((img, index) => (
									<ImagePreview
										key={img.id}
										img={img}
										offset={index ? "-20px" : "0px"}
										zIndex={index}
									/>
								))}
								{previewImagesArr.hiddenCount > 0 && (
									<ImagePreview
										more={previewImagesArr.hiddenCount}
										offset="-20px"
										zIndex={MAX_PREVIEW_IMAGES}
									/>
								)}
							</>
						)}
						{value && !isArrayImage(value) && !previewImagesArr && (
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
