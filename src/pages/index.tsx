import { API, getQueryClient, prepareApi } from "@app/api";
import { categoriesQuery, heroSectionQuery, homePageQuery } from "@app/queries";
import { HeroSection } from "@components/HeroSection";
import PageCenterWrapper from "@components/PageCenterWrapper";
import ProductsList from "@components/ProductsList/ProductsList";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FormattedMessage } from "react-intl";
import { dehydrate, useQuery } from "react-query";

interface HomeProps extends IDehydratedState {}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx
) => {
	const [queryClient, promises, , awaitAll] = prepareApi(ctx);
	promises.push(queryClient.prefetchQuery(...homePageQuery()));
	promises.push(queryClient.prefetchQuery(...heroSectionQuery()));

	await awaitAll();
	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { data, isLoading } = useQuery(...homePageQuery());

	return (
		<>
			<HeroSection />
			<PageCenterWrapper sx={{ mb: "50px" }}>
				<Typography variant="h4" component="h1">
					<FormattedMessage id="offersForYou" />
				</Typography>
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
		</>
	);
};

export default observer(Home);
