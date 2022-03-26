import { API, prepareApi } from "@app/api";
import { allProductsQuery } from "@app/queries";
import PageCenterWrapper from "@components/PageCenterWrapper";
import ProductsList from "@components/ProductsList/ProductsList";
import { Box, Skeleton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { FormattedMessage } from "react-intl";
import { dehydrate, useQuery } from "react-query";

interface CategoryListing extends IDehydratedState {}

interface Params extends ParsedUrlQuery {
	id: string;
}

export const getServerSideProps: GetServerSideProps<
	CategoryListing,
	Params
> = async (ctx) => {
	const [queryClient, promises] = prepareApi(ctx);
	promises.push(
		queryClient.prefetchQuery(...allProductsQuery(API.getInstance()))
	);

	await Promise.all(promises);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const CategoryListing = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { data, isLoading } = useQuery(...allProductsQuery());

	return (
		<PageCenterWrapper sx={{ mb: "50px" }}>
			{isLoading || !data ? (
				<Skeleton width="70%" height="60px" />
			) : (
				<Typography variant="h4" component="h1">
					<FormattedMessage id="categoryListingAll" />
				</Typography>
			)}
			<Box
				sx={(theme) => ({
					mt: "20px",
					[theme.breakpoints.up("md")]: {
						mt: "40px",
					},
				})}
			>
				<ProductsList products={data} isLoading={isLoading} />
			</Box>
		</PageCenterWrapper>
	);
};

export default observer(CategoryListing);
