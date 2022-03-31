import { userProfile } from "@app/queries";
import LinkTab from "@components/LinkTab";
import {
	Typography,
	Box,
	Grid,
	Tabs,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import ProfileSkeleton from "./ProfileSkeleton";

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
	const { data } = useQuery(...userProfile());

	const selectedTab = section as string;
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	if (!data) return <ProfileSkeleton />;

	return (
		<>
			<Typography variant="h4" component="h1">
				<FormattedMessage
					id="profile.title"
					values={{ firstName: data.name }}
				/>
			</Typography>

			<Box sx={{ mt: "20px" }}>
				<Grid container spacing="20px">
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
		</>
	);
};

export default Profile;
