import { prepareApi } from "@app/api";
import { productsSearchQuery } from "@app/queries";
import { getPathLocale } from "@app/utils/otherUtils";
import PageCenterWrapper from "@components/PageCenterWrapper";
import Pagination from "@components/Pagination";
import ProductsList from "@components/ProductsList/ProductsList";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { dehydrate, useQuery } from "react-query";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { q } = ctx.query;

	if (!q) {
		return {
			redirect: { destination: `${getPathLocale(ctx)}/`, permanent: false },
		};
	}

	if (!ctx.query.page) {
		return {
			redirect: {
				destination: `${getPathLocale(ctx)}/product/search?q=${q}&page=1`,
				permanent: false,
			},
		};
	}
	const page = Number(ctx.query.page);

	const [queryClient, promises, , awaitAll] = prepareApi(ctx);
	promises.push(
		queryClient.prefetchQuery(
			...productsSearchQuery({ q: q as string, page: page - 1 })
		)
	);

	await awaitAll();

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const SearchProduct = () => {
	const { query, push } = useRouter();
	const q = query.q as string;
	const page = Number(query.page);

	const { data, isLoading: isLoadingProducts } = useQuery(
		...productsSearchQuery({ q, page: page - 1 })
	);

	const handlePageChange = (page: number) => {
		push({ pathname: "/product/search", query: { page, q } });
	};

	return (
		<PageCenterWrapper>
			<Typography variant="h4" component="h1">
				<FormattedMessage id="productSearch.title" values={{ searchTerm: q }} />
			</Typography>
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

export default SearchProduct;
