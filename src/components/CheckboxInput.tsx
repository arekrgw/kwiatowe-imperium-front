import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
} from "@mui/material";
import { forwardRef } from "react";

interface CheckboxInputProps {
	helperText?: JSX.Element;
	error: boolean;
	value: boolean;
	onChange: (val: boolean) => void;
	onBlur: () => void;
	label: JSX.Element;
}

const CheckboxInput = forwardRef<HTMLButtonElement, CheckboxInputProps>(
	({ helperText, error, value, onChange, onBlur, label }, ref) => {
		return (
			<FormControl error={error}>
				<FormControlLabel
					control={
						<Checkbox
							ref={ref}
							checked={value}
							onChange={(e, val) => {
								onChange(val);
								onBlur();
							}}
						/>
					}
					label={label}
				/>
				{helperText && <FormHelperText>{helperText}</FormHelperText>}
			</FormControl>
		);
	}
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
