import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { calendarQueryAll } from "@app/queries";
import {
	useMediaQuery,
	Paper,
	Box,
	Typography,
	Button,
	Grid,
	TextField,
	Theme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useQueryClient } from "react-query";

interface DateEditFormProps {
	dateId?: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

interface MailData extends CalDateEdit {
	submitError: string;
}

const defaultValues = { date: new Date(), subject: "", body: "" };

const DateEditForm = ({ setOpen }: DateEditFormProps) => {
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

	const queryClient = useQueryClient();
	const {
		handleSubmit,
		control,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm<MailData>({
		defaultValues: { ...defaultValues },
	});

	const onFormSubmit = async (formValues: MailData) => {
		try {
			const payload = {
				...formValues,
				date: format(formValues.date, "yyyy-MM-dd"),
			};
			await API.getInstance().post(apiRoutes.dateCreate, payload);
			queryClient.invalidateQueries(calendarQueryAll()[0]);
			setOpen(false);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError("submitError", { message: err.response?.data });
			}
		}
	};

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
					<FormattedMessage id="calendar.section.title.create" />
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
						<FormattedMessage id="calendar.section.create" />
					</Button>
				)}
			</Box>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<Box sx={{ mt: "20px" }}>
					<Grid container spacing="15px">
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="subject"
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
										label={<FormattedMessage id="calendar.subject" />}
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Controller
								control={control}
								name="date"
								render={({ field }) => (
									<DatePicker
										label={<FormattedMessage id="calendar.date" />}
										inputFormat="yyyy-MM-dd"
										mask="____-__-__"
										renderInput={(params) => (
											<TextField
												fullWidth
												variant="outlined"
												error={!!errors[field.name]}
												{...params}
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
								name="body"
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										multiline
										error={!!errors[field.name]}
										helperText={
											errors[field.name] && (
												<FormattedMessage id={errors[field.name]?.message} />
											)
										}
										label={<FormattedMessage id="calendar.body" />}
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
						<FormattedMessage id="calendar.section.create" />
					</Button>
				)}
			</form>
		</Paper>
	);
};

export default DateEditForm;
