import { Box, Paper } from "@mui/material";
import EditCreateDateModal from "./EditCreateDateModal";
import { useState } from "react";
import DeleteButtonWithWarn from "@components/DeleteButtonWithWarn";
import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { useQueryClient } from "react-query";
import { calendarQueryAll } from "@app/queries";
import { format } from "date-fns";

interface DateListItemProps {
	date: CalDate;
}

const DateListItem = ({ date }: DateListItemProps) => {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const handleDeleteItem = async () => {
		try {
			await API.getInstance().delete(apiRoutes.dateDelete(date.id));
			queryClient.invalidateQueries(calendarQueryAll()[0]);
		} catch (err) {
			console.debug("calendar reminder delete failed");
		}
	};

	return (
		<>
			<EditCreateDateModal dateId={date.id} open={open} setOpen={setOpen} />
			<Box
				component={Paper}
				display="flex"
				gap="10px"
				p="15px"
				alignItems="center"
			>
				<Box sx={{ flex: { xs: "1 1 80%", md: "1 1 30%" } }}>
					{date.subject}
				</Box>
				<Box
					flex="1 1 40%"
					sx={{
						flex: "1 1 40%",
						display: { xs: "none", md: "block" },
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					{format(new Date(date.date), "yyyy-MM-dd")}
				</Box>
				<Box flex="0 1 auto">
					<Box display="flex">
						<DeleteButtonWithWarn onConfirm={handleDeleteItem} />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default DateListItem;
