import { API, prepareApi } from "@app/api";
import { categoryListingQuery } from "@app/queries";
import PageCenterWrapper from "@components/PageCenterWrapper";
import ProductsList from "@components/ProductsList/ProductsList";
import { Box, Skeleton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
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
	const { id } = ctx.params!;

	if (!id) return { notFound: true };

	const [queryClient, promises] = prepareApi(ctx);
	promises.push(queryClient.prefetchQuery(...categoryListingQuery({ id })));

	await Promise.all(promises);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const CategoryListing = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { query } = useRouter();
	const id = query.id as string;
	const { data, isLoading } = useQuery(...categoryListingQuery({ id }));

	return (
		<PageCenterWrapper sx={{ mb: "50px" }}>
			{isLoading || !data ? (
				<Skeleton width="70%" height="60px" />
			) : (
				<Typography variant="h4" component="h1">
					<FormattedMessage
						id="categoryListing"
						values={{ categoryName: data?.name }}
					/>
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
				<ProductsList products={data?.products} isLoading={isLoading} />
			</Box>
		</PageCenterWrapper>
	);
};

export default observer(CategoryListing);
