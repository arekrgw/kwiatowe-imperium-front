import PasswordField from "@components/PasswordField";
import { Box, TextField, Button, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import Wrapper from "./Wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
	firstName: yup.string().required("validation.required"),
	lastName: yup.string().required("validation.required"),
	email: yup.string().email("validation.email").required("validation.required"),
	password: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
});

export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface RegisterFormProps {}

const RegisterForm = (props: RegisterFormProps) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RegisterData>({
		defaultValues: { email: "", password: "", firstName: "", lastName: "" },
		resolver: yupResolver(validationSchema),
	});

	const onRegister = (data: RegisterData) => {
		console.log(data);
	};

	return (
		<Wrapper title="signin.register">
			<form onSubmit={handleSubmit(onRegister)}>
				<Box sx={{ mt: "20px" }}>
					<Grid container spacing="15px">
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="firstName"
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
								name="lastName"
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
				<Button type="submit" variant="contained" fullWidth sx={{ mt: "20px" }}>
					<FormattedMessage id="signin.btn-register" />
				</Button>
			</form>
		</Wrapper>
	);
};

export default RegisterForm;
