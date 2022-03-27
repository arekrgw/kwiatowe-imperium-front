import { API, getQueryClient, prepareApi } from "@app/api";
import { categoriesQuery, homePageQuery } from "@app/queries";
import { getPathLocale } from "@app/utils/otherUtils";
import { HeroSection } from "@components/HeroSection";
import LinkTab from "@components/LinkTab";
import PageCenterWrapper from "@components/PageCenterWrapper";
import ProductsList from "@components/ProductsList/ProductsList";
import {
	Box,
	Grid,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { dehydrate, useQuery } from "react-query";

interface HomeProps extends IDehydratedState {}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
	ctx
) => {
	// return {
	// 	redirect: {
	// 		destination: `${getPathLocale(ctx.defaultLocale!, ctx.locale)}/signin`,
	// 		permanent: false,
	// 	},
	// };

	if (!ctx.query?.section) {
		return {
			redirect: {
				destination: `${getPathLocale(ctx.defaultLocale!, ctx.locale)}${
					ctx.resolvedUrl
				}?section=details`,
				permanent: false,
			},
		};
	}

	const [queryClient, promises] = prepareApi(ctx);

	await Promise.all(promises);

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const TABS_MAPPING = [
	{ label: "profile.tab.details", value: "details" },
	{ label: "profile.tab.orders", value: "orders" },
	{ label: "profile.tab.addresses", value: "addresses" },
	{ label: "profile.tab.calendar", value: "calendar" },
];

const Profile = () => {
	const {
		query: { section },
		pathname,
	} = useRouter();
	const theme = useTheme();

	const selectedTab = section as string;
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<PageCenterWrapper>
			<Typography variant="h4" component="h1">
				<FormattedMessage id="profile.title" values={{ firstName: "Arek" }} />
			</Typography>

			<Box sx={{ mt: "20px" }}>
				<Grid container>
					<Grid item xs={12} md={3}>
						<Tabs
							value={selectedTab}
							variant="scrollable"
							orientation={isDesktop ? "vertical" : "horizontal"}
							scrollButtons="auto"
							sx={{
								"& .MuiTabScrollButton-root.Mui-disabled": {
									opacity: 0.3,
								},
								"& .MuiTabs-flexContainer": {
									width: { xs: "fit-content", md: "unset" },
									borderRight: { md: "2px solid" },
									borderBottom: { xs: "2px solid", md: "none" },
									borderColor: { xs: "brown.100" },
								},
							}}
							allowScrollButtonsMobile
						>
							{TABS_MAPPING.map((tab) => (
								<LinkTab
									key={tab.value}
									label={<FormattedMessage id={tab.label} />}
									href={`${pathname}?section=${tab.value}`}
									value={tab.value}
								/>
							))}
						</Tabs>
					</Grid>
					<Grid item xs={12} md={9}>
						<Box minHeight="500vh"></Box>
					</Grid>
				</Grid>
			</Box>
		</PageCenterWrapper>
	);
};

export default observer(Profile);
