import { userProfile } from "@app/queries";
import { Typography, Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Dates } from "./Calendar";
import Details from "./Details";
import Hero from "./Hero";
import { Orders } from "./Orders";
import ProfileNavigation from "./ProfileNavigation";
import { TABS_MAPPING } from "./tabQueryMapping";
import ProfileSkeleton from "./ProfileSkeleton";
import { Categories } from "./Categories";
import { Products } from "./Products";
import { Users } from "./Users";

const Profile = () => {
	const {
		query: { section },
		pathname,
	} = useRouter();
	const { data } = useQuery(...userProfile());

	const selectedTab = section as string;

	if (!data) return <ProfileSkeleton />;

	return (
		<Box sx={{ mb: "50px" }}>
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
						{selectedTab === TABS_MAPPING[2].value && <Dates />}
						{selectedTab === TABS_MAPPING[3].value && <Products />}
						{selectedTab === TABS_MAPPING[4].value && <Categories />}
						{selectedTab === TABS_MAPPING[5].value && <Hero />}
						{selectedTab === TABS_MAPPING[6].value && <Users />}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Profile;
