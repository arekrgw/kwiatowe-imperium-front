import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { categoriesQueryAll, productQuery } from "@app/queries";
import PickImage from "@components/PickImage";
import {
	useMediaQuery,
	Paper,
	Box,
	Typography,
	Button,
	Theme,
	Grid,
	TextField,
	Autocomplete,
	FormHelperText,
} from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, NestedValue, Resolver, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useQuery, useQueryClient } from "react-query";
import FormSkeleton from "../FormSkeleton";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ProductEditFormProps {
	productId?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

interface ProductData extends Omit<ProductEdit, "categories" | "images"> {
	categories: NestedValue<Category[]>;
	images: NestedValue<Image[]>;
	submitError: string;
}

const validationSchema = yup.object({
	namePl: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
	nameEn: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
	descriptionPl: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
	descriptionEn: yup
		.string()
		.min(3, "validation.min3")
		.required("validation.required"),
	price: yup.number().typeError("validation.number"),
	categories: yup.array().min(1, "validation.required"),
	images: yup.array().min(1, "validation.required"),
});

const defaultValues = {
	namePl: "",
	nameEn: "",
	descriptionPl: "",
	descriptionEn: "",
	price: 0,
	images: [],
	categories: [],
};

const ProductEditForm = ({ productId, setOpen }: ProductEditFormProps) => {
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));
	const { data: allCategories } = useQuery(...categoriesQueryAll());
	const { data: product, isLoading } = useQuery(
		...productQuery({ id: productId || "" }),
		{ enabled: Boolean(productId) }
	);

	const intl = useIntl();

	const {
		handleSubmit,
		control,
		clearErrors,
		setError,
		reset,
		formState: { errors },
	} = useForm<ProductData>({
		defaultValues: { ...defaultValues },
		resolver: yupResolver(validationSchema) as Resolver<ProductData>,
	});

	useEffect(() => {
		reset(product);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	const queryClient = useQueryClient();

	const onFormSubmit = handleSubmit(async (formValues) => {
		const payload = {
			...formValues,
			images: formValues.images.map((image) => image.id),
			categories: formValues.categories.map((category) => category.id),
		};
		try {
			if (productId) {
				await API.getInstance().patch(
					apiRoutes.productUpdate(productId),
					payload
				);
			} else {
				await API.getInstance().post(apiRoutes.productCreate, payload);
			}
			queryClient.invalidateQueries("products");
			setOpen(false);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError("submitError", {
					message: intl.formatMessage({ id: "server.error" }),
				});
			}
		}
	});

	return (
		<Paper
			sx={{
				position: "absolute",
				width: "700px",
				maxWidth: "95vw",
				maxHeight: "90vh",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				p: "20px",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography
					component="h1"
					sx={(theme) => ({
						fontSize: "h4.fontSize",
					})}
				>
					<FormattedMessage
						id={
							productId
								? "product.section.title.update"
								: "product.section.title.create"
						}
					/>
				</Typography>
				{isDesktop && (
					<Button
						type="button"
						variant="contained"
						disabled={isLoading}
						onClick={(e) => {
							clearErrors("submitError");
							onFormSubmit(e);
						}}
					>
						<FormattedMessage
							id={
								productId ? "product.section.update" : "product.section.create"
							}
						/>
					</Button>
				)}
			</Box>
			<form onSubmit={onFormSubmit}>
				<Box sx={{ mt: "20px" }}>
					{isLoading && <FormSkeleton />}
					{!isLoading && (
						<Grid container spacing="15px">
							<Grid item xs={12} md={6}>
								<Controller
									control={control}
									name="namePl"
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
											label={<FormattedMessage id="products.namePl" />}
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Controller
									control={control}
									name="nameEn"
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
											label={<FormattedMessage id="products.nameEn" />}
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Controller
									control={control}
									name="descriptionPl"
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
											label={<FormattedMessage id="products.descriptionPl" />}
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Controller
									control={control}
									name="descriptionEn"
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
											label={<FormattedMessage id="products.descriptionEn" />}
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Controller
									control={control}
									name="price"
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
											label={<FormattedMessage id="products.price" />}
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Controller
									control={control}
									name="categories"
									render={({ field: { onChange, ...field } }) => (
										<Autocomplete
											options={allCategories || []}
											isOptionEqualToValue={(option, value) =>
												option.id === value.id
											}
											multiple
											getOptionLabel={(option) => option.name}
											onChange={(event, value) => onChange(value)}
											renderInput={(props) => (
												<TextField
													label={<FormattedMessage id="products.categories" />}
													variant="outlined"
													error={!!errors[field.name]}
													helperText={
														errors[field.name] && (
															<FormattedMessage
																id={errors[field.name]?.message}
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
									name="images"
									render={({ field }) => (
										<>
											<PickImage {...field} />
											{errors[field.name] && (
												<FormHelperText error>
													<FormattedMessage id={errors[field.name]?.message} />
												</FormHelperText>
											)}
										</>
									)}
								/>
							</Grid>
						</Grid>
					)}
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
						<FormattedMessage
							id={
								productId ? "product.section.update" : "product.section.create"
							}
						/>
					</Button>
				)}
			</form>
		</Paper>
	);
};

export default ProductEditForm;
