import apiRoutes from "@app/apiRoutes";
import { useTimedSuccess } from "@app/utils/otherUtils";
import PickImage from "@components/PickImage";
import {
	Alert,
	Box,
	TextField,
	FormHelperText,
	Button,
	Theme,
	Grid,
	useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import SectionWrapper from "./SectionWrapper";

interface HeroProps {}

interface HeroData extends HeroEdit {
	submitError: string;
}

const Hero: FC<HeroProps> = () => {
	const {
		handleSubmit,
		clearErrors,
		control,
		formState: { errors },
	} = useForm<HeroData>({
		defaultValues: {},
	});

	const { show, setShow } = useTimedSuccess();
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

	const onHeroUpdate = async (formValues: HeroData) => {
		try {
			// const { data: user } = await API.getInstance().patch<User>(
			// 	apiRoutes.userProfile,
			// 	formValues
			// );
			// queryClient.setQueryData(userProfile()[0], user);
			// reset(user);
			// setShow(true);
		} catch (err) {
			// if (axios.isAxiosError(err)) {
			// 	setError("submitError", { message: err.response?.data });
			// }
		}
	};

	return (
		<SectionWrapper
			title="profile.section.hero"
			{...(isDesktop && {
				buttonRight: (
					<Button
						type="button"
						variant="contained"
						onClick={(e) => {
							clearErrors("submitError");
							handleSubmit(onHeroUpdate)(e);
						}}
					>
						<FormattedMessage id="hero.section.update" />
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
					handleSubmit(onHeroUpdate)(e);
				}}
			>
				<Box sx={{ mt: "20px" }}>
					<Grid container spacing="15px">
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="titleEn"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="hero.titleEn" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="titlePl"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="hero.titlePl" />}
										{...field}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="subtitlePl"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="hero.subtitlePl" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="subtitleEn"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="hero.subtitleEn" />}
										{...field}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="buttonTextEn"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="hero.buttonTextEn" />}
										{...field}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="buttonTextEn"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="hero.buttonTextEn" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								control={control}
								name="image"
								render={({ field }) => <PickImage {...field} />}
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
						<FormattedMessage id="hero.section.update" />
					</Button>
				)}
			</form>
		</SectionWrapper>
	);
};

export default Hero;
