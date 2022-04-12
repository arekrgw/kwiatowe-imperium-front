import {
	Grid,
	IconButton,
	InputAdornment,
	Modal,
	TextField,
} from "@mui/material";
import {
	ChangeEventHandler,
	FC,
	FocusEventHandler,
	forwardRef,
	useState,
} from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { ImageLibrary } from "@components/ImageLibrary";

interface PickImageProps {
	value: Image;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onBlur: FocusEventHandler<HTMLInputElement>;
	name: string;
}

const PickImage = forwardRef<HTMLDivElement, PickImageProps>(
	({ value, onChange, name, onBlur }, ref) => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<ImageLibrary open={open} setOpen={setOpen} />
				<TextField
					ref={ref}
					fullWidth
					InputProps={{
						disabled: true,
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setOpen(true)}>
									<PhotoLibraryIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					onBlur={onBlur}
				/>
			</>
		);
	}
);

PickImage.displayName = "PickImage";

export default PickImage;
