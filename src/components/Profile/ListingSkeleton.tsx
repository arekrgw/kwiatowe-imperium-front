import { Skeleton, Stack } from "@mui/material";

const ListingSkeleton = () => {
	return (
		<Stack spacing="10px">
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
			<Skeleton variant="rectangular" width="100%" height="60px" />
		</Stack>
	);
};

export default ListingSkeleton;
