import { Paper, Skeleton, Stack } from "@mui/material";

const ProducSkeleton = () => {
	return (
		<Paper
			sx={{
				p: "10px",
				display: "flex",
				flexDirection: "column",
				borderColor: "brown.200",
			}}
			variant="outlined"
		>
			<Skeleton variant="rectangular" height="120px" width="100%" />
			<Skeleton
				variant="rectangular"
				height="35px"
				width="100%"
				sx={{ mt: "20px" }}
			/>
			<Stack spacing="10px" sx={{ mt: "10px" }}>
				<Skeleton variant="rectangular" height="20px" width="95%" />
				<Skeleton variant="rectangular" height="20px" width="90%" />
				<Skeleton variant="rectangular" height="20px" width="95%" />
				<Skeleton variant="rectangular" height="20px" width="60%" />
			</Stack>
			<Skeleton
				variant="rectangular"
				height="20px"
				width="40px"
				sx={{ alignSelf: "flex-end", mt: "15px" }}
			/>
		</Paper>
	);
};

export default ProducSkeleton;
