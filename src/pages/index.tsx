import { API, getQueryClient } from "@app/api";
import { homePageQuery } from "@app/queries";
import ButtonLink from "@components/ButtonLink";
import { Footer } from "@components/Footer";
import { HeroSection } from "@components/HeroSection";
import PageCenterWrapper from "@components/PageCenterWrapper";
import ProductsList from "@components/ProductsList/ProductsList";
import { Box, Button, Typography } from "@mui/material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { dehydrate, useQuery } from "react-query";

interface HomeProps extends IDehydratedState {}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx
) => {
	API.setAcceptLanguageHeader(ctx.locale!);
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(...homePageQuery(API.getInstance()));

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
