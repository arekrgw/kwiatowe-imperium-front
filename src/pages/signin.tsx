import { API, getQueryClient } from "@app/api";
import { categoriesQuery, homePageQuery } from "@app/queries";
import { HeroSection } from "@components/HeroSection";
import PageCenterWrapper from "@components/PageCenterWrapper";
import ProductsList from "@components/ProductsList/ProductsList";
import { LoginForm, RegisterForm } from "@components/SignIn";
import { Box, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { dehydrate, useQuery } from "react-query";

interface HomeProps extends IDehydratedState {}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx
) => {
	API.setAcceptLanguageHeader(ctx.locale!);
	const queryClient = getQueryClient();
	await Promise.all([
		queryClient.prefetchQuery(...categoriesQuery(API.getInstance())),
	]);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const SignIn = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	return (
		<PageCenterWrapper sx={{ mb: "50px" }}>
			<Typography component="h1" sx={(theme) => ({ ...theme.typography.h4 })}>
				<FormattedMessage id="signin.joinorlogin" />
			</Typography>
			<Box mt="30px">
				<Grid container spacing="40px">
					<Grid item xs={12} md={6}>
						<LoginForm />
					</Grid>
					<Grid item xs={12} md={6}>
						<RegisterForm />
					</Grid>
				</Grid>
			</Box>
		</PageCenterWrapper>
	);
};

export default observer(SignIn);
