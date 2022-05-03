import { allUsers } from "@app/queries";
import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { ListingSkeleton } from "@components/Profile";
import UsersListItem from "./UsersListItem";

const Users = () => {
	const { data } = useQuery(...allUsers());

	if (!data) return <ListingSkeleton />;

	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="flex-start"
				pb="20px"
			>
				<Typography
					component="h1"
					sx={(theme) => ({
						fontSize: "h4.fontSize",
					})}
				>
					<FormattedMessage id="users.section.title" />
				</Typography>
			</Box>
			<Box display="flex" flexDirection="column" gap="10px">
				{data.map((user) => (
					<UsersListItem user={user} key={user.id} />
				))}
			</Box>
		</>
	);
};

export default Users;
