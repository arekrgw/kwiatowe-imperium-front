import { Skeleton, Stack } from "@mui/material";

const FormSkeleton = () => {
	return (
		<Stack spacing="10px">
			<Skeleton variant="rectangular" width="100%" height="50px" />
			<Skeleton variant="rectangular" width="100%" height="50px" />
			<Skeleton variant="rectangular" width="100%" height="50px" />
			<Skeleton variant="rectangular" width="100%" height="50px" />
			<Skeleton variant="rectangular" width="100%" height="50px" />
			<Skeleton variant="rectangular" width="100%" height="50px" />
		</Stack>
	);
};

export default FormSkeleton;
