import { getQueryClient } from "@app/api";
import { homePageQuery } from "@app/queries";
import ButtonLink from "@components/ButtonLink";
import { HeroSection } from "@components/HeroSection";
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
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(...homePageQuery());

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { data, isLoading } = useQuery(...homePageQuery());

	return (
		<Box>
			<HeroSection />
			<Box
				p="20px"
				sx={(theme) => ({
					p: "20px",
					[theme.breakpoints.up("md")]: {
						p: "40px 20px",
						width: "100%",
						maxWidth: "1200px",
						margin: "0 auto",
					},
				})}
			>
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
			</Box>
		</Box>
	);
};

export default observer(Home);
