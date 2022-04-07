import { userProfile } from "@app/queries";
import { Typography, Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import Addresses from "./Addresses";
import Calendar from "./Calendar";
import Details from "./Details";
import Hero from "./Hero";
import Orders from "./Orders";
import ProfileNavigation, { TABS_MAPPING } from "./ProfileNavigation";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
	const {
		query: { section },
		pathname,
	} = useRouter();
	const { data } = useQuery(...userProfile());

	const selectedTab = section as string;

	if (!data) return <ProfileSkeleton />;

	return (
		<>
			<Typography variant="h4" component="h1">
				<FormattedMessage
					id="profile.title"
					values={{ firstName: data.name }}
				/>
			</Typography>

			<Box sx={{ mt: { xs: "20px", md: "40px" } }}>
				<Grid container spacing="20px">
					<Grid item xs={12} md={3}>
						<ProfileNavigation pathname={pathname} selectedTab={selectedTab} />
					</Grid>
					<Grid item xs={12} md={9}>
						{selectedTab === TABS_MAPPING[0].value && <Details />}
						{selectedTab === TABS_MAPPING[1].value && <Orders />}
						{selectedTab === TABS_MAPPING[2].value && <Addresses />}
						{selectedTab === TABS_MAPPING[3].value && <Calendar />}
						{selectedTab === TABS_MAPPING[6].value && <Hero />}
						<Box minHeight="500vh"></Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Profile;
