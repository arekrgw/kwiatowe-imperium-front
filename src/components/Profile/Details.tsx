import PasswordField from "@components/PasswordField";
import {
	Box,
	Button,
	FormHelperText,
	Grid,
	Paper,
	TextField,
	Theme,
	useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormattedMessage } from "react-intl";
import SectionWrapper from "./SectionWrapper";
import * as yup from "yup";
import { useQuery, useQueryClient } from "react-query";
import { userProfile } from "@app/queries";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import axios from "axios";

interface DetailsProps {}

export interface ProfileData {
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
});

const Details: FC<DetailsProps> = () => {
	const queryClient = useQueryClient();
	const { data } = useQuery(...userProfile());

	const { password, ...profile } = data || {};

	const {
		handleSubmit,
		control,
		reset,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<ProfileData>({
		defaultValues: { ...profile },
		resolver: yupResolver(validationSchema),
	});

	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

	const onProfileUpdate = async (formValues: ProfileData) => {
		console.log("asdasdas");
		try {
			const { data: user } = await API.getInstance().patch<User>(
				apiRoutes.userProfile,
				formValues
			);

			queryClient.setQueryData(userProfile()[0], user);
			const { password, ...p } = user;
			reset(p);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.log(err.response?.data);
			}
			console.log(err);
		}
	};

	return (
		<SectionWrapper
			title="profile.section.details"
			{...(isDesktop && {
				buttonRight: (
					<Button
						type="button"
						variant="contained"
						onClick={(e) => {
							clearErrors("submitError");
							handleSubmit(onProfileUpdate)(e);
						}}
					>
						<FormattedMessage id="profile.details.update" />
					</Button>
				),
			})}
		>
			<form onSubmit={handleSubmit(onProfileUpdate)}>
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
										autoComplete="new-password"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="signin.newPassword" />}
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
				{!isDesktop && (
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: "20px" }}
						fullWidth
						onClick={() => clearErrors("submitError")}
					>
						<FormattedMessage id="profile.details.update" />
					</Button>
				)}
			</form>
		</SectionWrapper>
	);
};

export default Details;
