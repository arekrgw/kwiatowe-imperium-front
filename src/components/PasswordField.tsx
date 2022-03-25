import {
	IconButton,
	InputAdornment,
	TextField,
	TextFieldProps,
} from "@mui/material";
import { forwardRef, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordField = forwardRef<HTMLDivElement, Omit<TextFieldProps, "type">>(
	({ InputProps, ...props }, ref) => {
		const [show, setShow] = useState(false);
		return (
			<TextField
				ref={ref}
				type={show ? "text" : "password"}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setShow(!show)}>
								{show ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
					...InputProps,
				}}
				{...props}
			/>
		);
	}
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
