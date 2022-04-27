import { prepareApi } from "@app/api";
import { categoryListingQuery, categoryQuery } from "@app/queries";
import { getPathLocale } from "@app/utils/otherUtils";
import PageCenterWrapper from "@components/PageCenterWrapper";
import Pagination from "@components/Pagination";
import ProductsList from "@components/ProductsList/ProductsList";
import { Box, Skeleton, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import qs, { ParsedUrlQuery } from "querystring";
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
	if (!ctx.query.page) {
		return {
			redirect: {
				destination: `${getPathLocale(ctx)}/category/${id}?page=1`,
				permanent: false,
			},
		};
	}
	const page = Number(ctx.query.page);

	const [queryClient, promises, , awaitAll] = prepareApi(ctx);
	promises.push(
		queryClient.prefetchQuery(...categoryListingQuery({ id, page: page - 1 }))
	);
	promises.push(queryClient.prefetchQuery(...categoryQuery({ id })));

	await awaitAll();

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const CategoryListing = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { query, push } = useRouter();
	const id = query.id as string;
	const page = Number(query.page);

	const { data, isLoading: isLoadingProducts } = useQuery(
		...categoryListingQuery({ id, page: page - 1 })
	);
	const { data: cat, isLoading: isCategoryLoading } = useQuery(
		...categoryQuery({ id })
	);

	const handlePageChange = (page: number) => {
		push({ pathname: "/category/[id]", query: { page, id } });
	};

	return (
		<PageCenterWrapper sx={{ mb: "50px" }}>
			{isCategoryLoading || !cat ? (
				<Skeleton width="70%" height="60px" />
			) : (
				<Typography variant="h4" component="h1">
					<FormattedMessage
						id="categoryListing"
						values={{ categoryName: cat.name }}
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
				{data?.count === 0 ? (
					<Typography variant="h5" component="h5" textAlign="center">
						<FormattedMessage id="pagination.nodata" />
					</Typography>
				) : (
					<ProductsList products={data?.data} isLoading={isLoadingProducts} />
				)}
			</Box>
			{!!data?.count && (
				<Box display="flex" justifyContent="center" mt="30px">
					<Pagination
						count={data.count}
						page={page}
						onChange={handlePageChange}
					/>
				</Box>
			)}
		</PageCenterWrapper>
	);
};

export default observer(CategoryListing);
