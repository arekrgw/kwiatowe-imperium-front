import {
	Alert,
	Box,
	Button,
	FormHelperText,
	Grid,
	TextField,
	Theme,
	useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormattedMessage } from "react-intl";
import { SectionWrapper } from "@components/Profile";
import * as yup from "yup";
import { useQuery, useQueryClient } from "react-query";
import { userProfile } from "@app/queries";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import axios from "axios";
import { useTimedSuccess } from "@app/utils/otherUtils";

interface ProfileEditFormProps {}

export interface ProfileData {
	name: string;
	surname: string;
	email: string;
	password: string;
	submitError: string;
	address: string;
	city: string;
	postalCode: string;
}

const validationSchema = yup.object({
	name: yup.string().min(3, "validation.min3").required("validation.required"),
	surname: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
	email: yup.string().email("validation.email").required("validation.required"),
});

const ProfileEditForm: FC<ProfileEditFormProps> = () => {
	const queryClient = useQueryClient();
	const { data: profile } = useQuery(...userProfile());

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
	const { show, setShow } = useTimedSuccess();

	const onProfileUpdate = async (formValues: ProfileData) => {
		try {
			const { data: user } = await API.getInstance().patch<User>(
				apiRoutes.userProfile,
				formValues
			);

			queryClient.setQueryData(userProfile()[0], user);
			reset(user);
			setShow(true);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError("submitError", { message: err.response?.data });
			}
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
			{show && (
				<Alert severity="success" sx={{ mt: "20px", mb: "20px" }}>
					<FormattedMessage id="profile.details.success" />
				</Alert>
			)}
			<form
				onSubmit={(e) => {
					clearErrors("submitError");
					handleSubmit(onProfileUpdate)(e);
				}}
			>
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
								name="address"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										autoComplete="address"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="profile.details.address" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="postalCode"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										autoComplete="postal-code"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="profile.details.postalCode" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="city"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										autoComplete="city"
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="profile.details.city" />}
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
					>
						<FormattedMessage id="profile.details.update" />
					</Button>
				)}
			</form>
		</SectionWrapper>
	);
};

export default ProfileEditForm;
