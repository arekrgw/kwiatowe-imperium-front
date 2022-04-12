import { Grid, Skeleton } from "@mui/material";
import { FC } from "react";

interface ImagesSkeletonProps {}

const ImagesSkeleton: FC<ImagesSkeletonProps> = (props) => {
	return (
		<>
			{Array(15)
				.fill(1)
				.map((_, i) => (
					<Grid item xs={6} sm={4} md={3} lg={2} key={i}>
						<Skeleton variant="rectangular" width="100%" height="150px" />
					</Grid>
				))}
		</>
	);
};

export default ImagesSkeleton;
