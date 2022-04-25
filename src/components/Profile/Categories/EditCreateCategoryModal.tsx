import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { categoriesQuery, categoriesQueryAll } from "@app/queries";
import CheckboxInput from "@components/CheckboxInput";
import {
	Box,
	Button,
	Grid,
	Modal,
	Paper,
	TextField,
	Theme,
	Typography,
	useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useQueryClient } from "react-query";

interface EditCreateCategoryModalProps {
	open: boolean;
	categoryId?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

interface CategoryData extends CategoryEdit {
	submitError: string;
}

const defaultValues = { _visible: true, namePl: "", nameEn: "" };

const EditCreateCategoryModal = ({
	open,
	setOpen,
	categoryId,
}: EditCreateCategoryModalProps) => {
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));
	const queryClient = useQueryClient();
	const {
		handleSubmit,
		control,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm<CategoryData>({
		defaultValues: { ...defaultValues },
	});

	const onFormSubmit = async (formValues: any) => {
		try {
			if (categoryId) {
				console.log("asd");
			} else {
				await API.getInstance().post(apiRoutes.categoryCreate, formValues);
				queryClient.invalidateQueries(categoriesQueryAll()[0]);
				queryClient.invalidateQueries(categoriesQuery()[0]);
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
								categoryId
									? "category.section.title.update"
									: "category.section.title.create"
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
									categoryId
										? "category.section.update"
										: "category.section.create"
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
											label={<FormattedMessage id="categories.namePl" />}
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
											label={<FormattedMessage id="categories.nameEn" />}
											{...field}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Controller
									control={control}
									name="_visible"
									render={({ field }) => (
										<CheckboxInput
											error={!!errors[field.name]}
											helperText={
												errors[field.name] && (
													<FormattedMessage id={errors[field.name]?.message} />
												)
											}
											label={<FormattedMessage id="categories.visible" />}
											{...field}
										/>
									)}
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
									categoryId
										? "category.section.update"
										: "category.section.create"
								}
							/>
						</Button>
					)}
				</form>
			</Paper>
		</Modal>
	);
};

export default EditCreateCategoryModal;
