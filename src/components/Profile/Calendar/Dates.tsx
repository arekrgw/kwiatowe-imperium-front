import { calendarQueryAll } from "@app/queries";
import { Box, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { ListingSkeleton } from "@components/Profile";
import DateListItem from "./DateListItem";
import EditCreateDateModal from "./EditCreateDateModal";
import AddIcon from "@mui/icons-material/Add";
import { FormattedMessage } from "react-intl";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
	const { data } = useQuery(...calendarQueryAll());
	const [newCat, setNewCat] = useState(false);

	if (!data) return <ListingSkeleton />;

	return (
		<>
			<EditCreateDateModal open={newCat} setOpen={setNewCat} />
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				pb="20px"
			>
				<Typography
					component="h1"
					sx={(theme) => ({
						fontSize: "h4.fontSize",
					})}
				>
					<FormattedMessage id="calendar.section.title" />
				</Typography>
				<IconButton onClick={() => setNewCat(true)}>
					<AddIcon />
				</IconButton>
			</Box>
			<Box display="flex" flexDirection="column" gap="10px">
				{data.map((date) => (
					<DateListItem date={date} key={date.id} />
				))}
			</Box>
		</>
	);
};

export default Categories;
