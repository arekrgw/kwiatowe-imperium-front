import { API, prepareApi } from "@app/api";
import { allProductsQuery } from "@app/queries";
import { getPathLocale } from "@app/utils/otherUtils";
import PageCenterWrapper from "@components/PageCenterWrapper";
import Pagination from "@components/Pagination";
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
	if (!ctx.query.page)
		return {
			redirect: {
				destination: `${getPathLocale(ctx)}/category?page=1`,
				permanent: false,
			},
		};

	const page = Number(ctx.query.page);

	const [queryClient, promises] = prepareApi(ctx);
	promises.push(
		queryClient.prefetchQuery(...allProductsQuery({ page: page - 1 }))
	);

	await Promise.all(promises);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const CategoryListing = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { query, push } = useRouter();
	const page = Number(query.page);
	const { data, isLoading } = useQuery(...allProductsQuery({ page: page - 1 }));

	const handlePageChange = (page: number) => {
		push({ pathname: "/category", query: { page } });
	};

	return (
		<PageCenterWrapper sx={{ mb: "50px" }}>
			<Typography variant="h4" component="h1">
				<FormattedMessage id="categoryListingAll" />
			</Typography>
			<Box
				sx={(theme) => ({
					mt: "20px",
					[theme.breakpoints.up("md")]: {
						mt: "40px",
					},
				})}
			>
				<ProductsList products={data?.data} isLoading={isLoading} />
			</Box>
			{data && (
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
