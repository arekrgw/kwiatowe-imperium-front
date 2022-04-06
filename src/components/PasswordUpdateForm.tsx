import { yupResolver } from "@hookform/resolvers/yup";
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	FormHelperText,
	Grid,
	Theme,
	useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { SectionWrapper } from "@components/Profile";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import axios from "axios";
import * as yup from "yup";
import PasswordField from "@components/PasswordField";
import { useTimedSuccess } from "@app/utils/otherUtils";

interface PasswordUpdateFormProps {}

interface PasswordData {
	oldPassword: string;
	newPassword: string;
	submitError: string;
}

const validationSchema = yup.object({
	oldPassword: yup.string().required("validation.required"),
	newPassword: yup.string().required("validation.required"),
});

const PasswordUpdateForm: FC<PasswordUpdateFormProps> = () => {
	const {
		handleSubmit,
		control,
		reset,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<PasswordData>({
		defaultValues: { newPassword: "", oldPassword: "" },
		resolver: yupResolver(validationSchema),
	});

	const { show, setShow } = useTimedSuccess();

	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
	const intl = useIntl();

	const onPasswordUpdate = async (formValues: PasswordData) => {
		try {
			await API.getInstance().patch(apiRoutes.passwordChange, formValues);
			reset();
			setShow(true);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError("submitError", {
					message: intl.formatMessage({
						id: `passwordChange.error.${err.response?.data}`,
					}),
				});
			}
		}
	};

	return (
		<SectionWrapper
			title="profile.section.changePassword"
			{...(isDesktop && {
				buttonRight: (
					<Button
						type="button"
						variant="contained"
						onClick={(e) => {
							clearErrors("submitError");
							handleSubmit(onPasswordUpdate)(e);
						}}
					>
						<FormattedMessage id="profile.details.changePassword" />
					</Button>
				),
			})}
		>
			{show && (
				<Alert severity="success" sx={{ mt: "20px", mb: "20px" }}>
					<FormattedMessage id="passwordChange.success" />
				</Alert>
			)}
			<form
				onSubmit={(e) => {
					clearErrors("submitError");
					handleSubmit(onPasswordUpdate)(e);
				}}
			>
				<Box sx={{ mt: "20px" }}>
					<Grid container spacing="15px">
						<Grid item xs={12}>
							<Controller
								control={control}
								name="oldPassword"
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
										label={<FormattedMessage id="signin.oldPassword" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								control={control}
								name="newPassword"
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
					>
						<FormattedMessage id="profile.details.changePassword" />
					</Button>
				)}
			</form>
		</SectionWrapper>
	);
};

export default PasswordUpdateForm;
