import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { setJwt } from "@app/auth";
import PasswordField from "@components/PasswordField";
import { Button, FormHelperText, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Wrapper from "./Wrapper";

export interface LoginData {
	email: string;
	password: string;
	submitError: string;
}

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<LoginData>({
		defaultValues: { email: "", password: "" },
	});
	const intl = useIntl();
	const router = useRouter();

	const onLogin = async (formValues: LoginData) => {
		try {
			const { data } = await API.getInstance().post<LoginResponse>(
				apiRoutes.login,
				{
					email: formValues.email,
					password: formValues.password,
				}
			);

			setJwt(data.jwt);
			router.replace("/profile");
		} catch (err) {
			setError("submitError", {
				message: intl.formatMessage({ id: "validation.notValidCredentials" }),
			});
		}
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

				{errors.submitError && (
					<FormHelperText error sx={{ mt: "20px" }}>
						{errors.submitError?.message}
					</FormHelperText>
				)}
				<Button
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: "20px" }}
					onClick={() => clearErrors("submitError")}
				>
					<FormattedMessage id="signin.btn-login" />
				</Button>
			</form>
		</Wrapper>
	);
};

export default LoginForm;
