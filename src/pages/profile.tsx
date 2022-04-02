import { getPathLocale } from "@app/utils/otherUtils";
import PageCenterWrapper from "@components/PageCenterWrapper";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps } from "next";
import { dehydrate } from "react-query";
import { prepareApi } from "@app/api";
import { Profile } from "@components/Profile";
import { FormattedMessage } from "react-intl";

interface HomeProps extends IDehydratedState {}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx
) => {
	if (!ctx.query?.section) {
		return {
			redirect: {
				destination: `${getPathLocale(ctx)}${ctx.resolvedUrl}?section=details`,
				permanent: false,
			},
		};
	}

	const [queryClient, , userPromise, awaitAll] = prepareApi(ctx);

	const user = await userPromise;
	if (!user) {
		return {
			redirect: {
				destination: `${getPathLocale(ctx)}/signin`,
				permanent: false,
			},
		};
	}

	await awaitAll();

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const ProfilePage = () => {
	return (
		<PageCenterWrapper>
			<Profile />
		</PageCenterWrapper>
	);
};

export default observer(ProfilePage);
