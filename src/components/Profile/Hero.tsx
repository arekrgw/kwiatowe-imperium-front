import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { categoriesQueryAll, heroEditQuery } from "@app/queries";
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
	Autocomplete,
} from "@mui/material";
import axios from "axios";
import { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery, useQueryClient } from "react-query";
import SectionWrapper from "./SectionWrapper";

interface HeroProps {}

interface HeroData extends HeroEdit {
	submitError: string;
}

const Hero: FC<HeroProps> = () => {
	const { data: heroEditData } = useQuery(...heroEditQuery());
	const { data: allCategories } = useQuery(...categoriesQueryAll());

	const queryClient = useQueryClient();

	const {
		handleSubmit,
		clearErrors,
		control,
		reset,
		setError,
		formState: { errors },
	} = useForm<HeroData>({
		defaultValues: { ...heroEditData },
	});

	const intl = useIntl();

	const { show, setShow } = useTimedSuccess();
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

	useEffect(() => {
		reset(heroEditData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heroEditData]);

	const onHeroUpdate = async (formValues: HeroData) => {
		try {
			const payload = {
				...formValues,
				image: formValues.image?.id,
				category: formValues.category.id,
			};

			await API.getInstance().patch<HeroEdit>(apiRoutes.updateHero, payload);

			queryClient.invalidateQueries(heroEditQuery()[0]);
			setShow(true);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError("submitError", {
					message: intl.formatMessage({ id: "server.error" }),
				});
			}
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
					<FormattedMessage id="profile.hero.success" />
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
								name="buttonTextPl"
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
										label={<FormattedMessage id="hero.buttonTextPl" />}
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
								name="category"
								render={({ field: { onChange, ...field } }) => (
									<Autocomplete
										options={allCategories || []}
										isOptionEqualToValue={(option, value) =>
											option.id === value.id
										}
										getOptionLabel={(option) => option.name}
										onChange={(event, value) => onChange(value)}
										renderInput={(props) => (
											<TextField
												label={<FormattedMessage id="hero.category" />}
												variant="outlined"
												error={!!errors[field.name]}
												helperText={
													errors[field.name] && (
														<FormattedMessage
															id={errors[field.name]?.id?.message}
														/>
													)
												}
												{...props}
											/>
										)}
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
