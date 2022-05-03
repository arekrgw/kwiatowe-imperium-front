import { API } from "@app/api";
import apiRoutes from "@app/apiRoutes";
import { allUsers } from "@app/queries";
import DeleteButtonWithWarn from "@components/DeleteButtonWithWarn";
import { Box, Paper } from "@mui/material";
import { useQueryClient } from "react-query";

interface UserListItemProps {
	user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
	const queryClient = useQueryClient();

	const handleDeleteItem = async () => {
		try {
			await API.getInstance().delete(apiRoutes.usersDelete(user.id));
			queryClient.invalidateQueries(allUsers()[0]);
		} catch (err) {
			console.debug("product delete failed");
		}
	};
	return (
		<Box
			component={Paper}
			display="flex"
			gap="15px"
			height="70px"
			alignItems="center"
			px="15px"
		>
			<Box
				sx={{
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					flex: { xs: "1 1 80%", md: "1 1 30%" },
				}}
			>
				{user.email}
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
				{user.roles.map((role) => role.name)}
			</Box>
			<Box flex="0 1 auto">
				<DeleteButtonWithWarn onConfirm={handleDeleteItem} />
			</Box>
		</Box>
	);
};

export default UserListItem;
