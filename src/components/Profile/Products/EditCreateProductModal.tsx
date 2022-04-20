import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { allProductsQuery } from "@app/queries";
import {
	useMediaQuery,
	Modal,
	Paper,
	Box,
	Typography,
	Button,
	Theme,
} from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useQueryClient } from "react-query";

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
};

interface ProductData extends ProductEdit {
	submitError: string;
}

const EditCreateProductModal = ({
	productId,
	open,
	setOpen,
}: EditCreateProductModalProps) => {
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
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
			</Paper>
		</Modal>
	);
};

export default EditCreateProductModal;
