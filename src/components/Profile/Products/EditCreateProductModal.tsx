import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { allProductsQuery, categoriesQueryAll } from "@app/queries";
import PickImage from "@components/PickImage";
import {
	useMediaQuery,
	Modal,
	Paper,
	Box,
	Typography,
	Button,
	Theme,
	Grid,
	TextField,
	Autocomplete,
} from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useQuery, useQueryClient } from "react-query";

interface EditCreateProductModalProps {
	open: boolean;
	productId?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
	namePl: "",
	nameEn: "",
	descriptionPl: "",
	descriptionEn: "",
	price: 0,
	images: [],
	categories: [],
};

interface ProductData extends ProductEdit {
	submitError: string;
}

const EditCreateProductModal = ({
	productId,
	open,
	setOpen,
}: EditCreateProductModalProps) => {
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));
	const { data: allCategories } = useQuery(...categoriesQueryAll());
	const {
		handleSubmit,
		control,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm<ProductData>({
		defaultValues: { ...defaultValues },
	});

	const queryClient = useQueryClient();

	const onFormSubmit = async (formValues: ProductData) => {
		try {
			if (productId) {
				console.log("asd");
			} else {
				await API.getInstance().post(apiRoutes.categoryCreate, formValues);
				queryClient.invalidateQueries(allProductsQuery()[0]);
				setOpen(false);
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError("submitError", { message: err.response?.data });
			}
		}
	};
	return (
		<Modal open={open} onClose={(_, reason) => setOpen(false)}>
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
							onClick={(e) => {
								clearErrors("submitError");
								handleSubmit(onFormSubmit)(e);
							}}
						>
							<FormattedMessage
								id={
									productId
										? "product.section.update"
										: "product.section.create"
								}
							/>
						</Button>
					)}
				</Box>
				<form onSubmit={handleSubmit(onFormSubmit)}>
					<Box sx={{ mt: "20px" }}>
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
									render={({ field }) => (
										<Autocomplete
											options={allCategories || []}
											isOptionEqualToValue={(option, value) =>
												option.id === value.id
											}
											multiple
											getOptionLabel={(option) => option.name}
											renderInput={(props) => (
												<TextField
													label={<FormattedMessage id="products.categories" />}
													variant="outlined"
													error={!!errors[field.name]}
													helperText={
														errors[field.name] && (
															<FormattedMessage
																id={errors[field.name]?.[0]?.id?.message}
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
									render={({ field }) => <PickImage {...field} />}
								/>
							</Grid>
						</Grid>
					</Box>
					{!isDesktop && (
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: "20px" }}
							fullWidth
						>
							<FormattedMessage
								id={
									productId
										? "product.section.update"
										: "product.section.create"
								}
							/>
						</Button>
					)}
				</form>
			</Paper>
		</Modal>
	);
};

export default EditCreateProductModal;
