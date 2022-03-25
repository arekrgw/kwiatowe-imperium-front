import PasswordField from "@components/PasswordField";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { string } from "yup";
import Wrapper from "./Wrapper";

export interface LoginData {
	email: string;
	password: string;
}

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginData>({
		defaultValues: { email: "", password: "" },
	});

	const onLogin = (data: LoginData) => {
		console.log(data);
	};

	return (
		<Wrapper title="signin.login">
			<form onSubmit={handleSubmit(onLogin)}>
				<Stack gap="15px" sx={{ mt: "20px" }}>
					<Controller
						control={control}
						name="email"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								variant="outlined"
								fullWidth
								autoComplete="email"
								error={!!errors[field.name]}
								helperText={
									errors[field.name] && (
										<FormattedMessage id="validation.required" />
									)
								}
								label={<FormattedMessage id="signin.email" />}
								{...field}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						rules={{ required: true }}
						render={({ field }) => (
							<PasswordField
								variant="outlined"
								fullWidth
								autoComplete="current-password"
								error={!!errors[field.name]}
								helperText={
									errors[field.name] && (
										<FormattedMessage id="validation.required" />
									)
								}
								label={<FormattedMessage id="signin.password" />}
								{...field}
							/>
						)}
					/>
				</Stack>
				<Button type="submit" variant="contained" fullWidth sx={{ mt: "20px" }}>
					<FormattedMessage id="signin.btn-login" />
				</Button>
			</form>
		</Wrapper>
	);
};

export default LoginForm;
