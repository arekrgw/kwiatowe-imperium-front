import { Box } from "@mui/material";
import ProfileEditForm from "@components/ProfileEditForm";
import { FC } from "react";
import PasswordUpdateForm from "@components/PasswordUpdateForm";

interface DetailsProps {}

export interface ProfileData {
	name: string;
	surname: string;
	email: string;
	password: string;
	submitError: string;
}

const Details: FC<DetailsProps> = () => {
	return (
		<>
			<Box>
				<ProfileEditForm />
			</Box>
			<Box mt="20px">
				<PasswordUpdateForm />
			</Box>
		</>
	);
};

export default Details;
