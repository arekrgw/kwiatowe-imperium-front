import PasswordField from "@components/PasswordField";
import {
	Box,
	TextField,
	Button,
	Grid,
	FormHelperText,
	Alert,
	AlertTitle,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Wrapper from "./Wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiRoutes from "@app/apiRoutes";
import { API } from "@app/api";
import axios from "axios";
import { useState } from "react";
export interface RegisterData {
	name: string;
	surname: string;
	email: string;
	password: string;
	submitError: string;
}

const validationSchema = yup.object({
	name: yup.string().min(3, "validation.min3").required("validation.required"),
	surname: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
	email: yup.string().email("validation.email").required("validation.required"),
	password: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
});

interface RegisterFormProps {}

const RegisterForm = (props: RegisterFormProps) => {
	const {
		handleSubmit,
		control,
		reset,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<RegisterData>({
		defaultValues: { email: "", password: "", name: "", surname: "" },
		resolver: yupResolver(validationSchema),
	});

	const [success, setSuccess] = useState(false);
	const intl = useIntl();

	const onRegister = async (formValues: RegisterData) => {
		try {
			const { data } = await API.getInstance().post<string>(
				apiRoutes.register,
				{
					...formValues,
				}
			);

			reset();
			setSuccess(true);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError("submitError", {
					message: intl.formatMessage({
						id: `validation.${err.response?.data}`,
					}),
				});
			}
		}
	};

	return (
		<Wrapper title="signin.register">
			{success && (
				<Alert severity="success" sx={{ mt: "20px", mb: "30px" }}>
					<AlertTitle>
						<FormattedMessage id="register.success.title" />
					</AlertTitle>
					<FormattedMessage id="register.success.message" />
				</Alert>
			)}

			<form onSubmit={handleSubmit(onRegister)}>
				<Box sx={{ mt: "20px" }}>
					<Grid container spacing="15px">
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="name"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										autoComplete="firstname"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="signin.firstName" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="surname"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										autoComplete="lastname"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="signin.lastName" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								control={control}
								name="email"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										autoComplete="email"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="signin.email" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								control={control}
								name="password"
								render={({ field }) => (
									<PasswordField
										variant="outlined"
										fullWidth
										autoComplete="current-password"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="signin.password" />}
										{...field}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Box>

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
					<FormattedMessage id="signin.btn-register" />
				</Button>
			</form>
		</Wrapper>
	);
};

export default RegisterForm;
