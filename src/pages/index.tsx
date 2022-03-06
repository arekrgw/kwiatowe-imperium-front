import { getQueryClient } from "@app/api";
import { Button, Typography } from "@mui/material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { dehydrate, useQuery } from "react-query";

const getFilms = async () =>
	(await fetch("https://swapi.dev/api/films/")).json();

interface HomeProps extends IDehydratedState {}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx
) => {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery("films", getFilms);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const { mainStore } = useStore();
	const { data } = useQuery("films", getFilms);

	return (
		<div>
			<Typography variant="h1">Home</Typography>
			<Button variant="contained">Go for it</Button>
			<Typography>{mainStore.film}</Typography>
			{JSON.stringify(data)}
		</div>
	);
};

export default observer(Home);
