import { Box, Grid, Skeleton } from "@mui/material";

const ProfileSkeleton = () => {
	return (
		<>
			<Skeleton variant="rectangular" width="40%" height="30px" />

			<Box sx={{ mt: "20px" }}>
				<Grid container spacing="20px">
					<Grid item xs={12} md={3}>
						<Skeleton
							variant="rectangular"
							width="100%"
							sx={{ height: { xs: "60px", md: "200px" } }}
						/>
					</Grid>
					<Grid item xs={12} md={9}>
						<Skeleton variant="rectangular" width="100%" height="500px" />
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default ProfileSkeleton;
