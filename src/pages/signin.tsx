import { prepareApi } from "@app/api";
import PageCenterWrapper from "@components/PageCenterWrapper";
import { LoginForm, RegisterForm } from "@components/SignIn";
import { Box, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { FormattedMessage } from "react-intl";
import { dehydrate } from "react-query";

interface HomeProps extends IDehydratedState {}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx
) => {
	const [queryClient, , userPromise, awaitAll] = prepareApi(ctx);

	const user = await userPromise;
	if (user) {
		return {
			redirect: {
				destination: "/profile",
				permanent: false,
			},
		};
	}
	await awaitAll();

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
