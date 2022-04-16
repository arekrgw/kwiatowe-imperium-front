import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
} from "@mui/material";

interface CheckboxInputProps {
	helperText?: JSX.Element;
	error: boolean;
	value: boolean;
	onChange: (val: boolean) => void;
	onBlur: () => void;
	label: JSX.Element;
}

const CheckboxInput = ({
	helperText,
	error,
	value,
	onChange,
	onBlur,
	label,
}: CheckboxInputProps) => {
	return (
		<FormControl error={error}>
			<FormControlLabel
				control={
					<Checkbox
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
};

export default CheckboxInput;
