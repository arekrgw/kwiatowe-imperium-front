import { API, getQueryClient } from "@app/api";
import { categoriesQuery, homePageQuery } from "@app/queries";
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
	// API.setAcceptLanguageHeader(ctx.locale!);
	// const queryClient = getQueryClient();
	// await Promise.all([
	// 	queryClient.prefetchQuery(...categoriesQuery(API.getInstance())),
	// ]);

	// return {
	// 	props: { dehydratedState: dehydrate(queryClient) },
	// };

	return {
		redirect: {
			destination: "/signin",
			permanent: false,
		},
	};
};

const Profile = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return <></>;
};

export default observer(Profile);
