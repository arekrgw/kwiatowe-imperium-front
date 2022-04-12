import { isAvailable } from "@app/auth";
import { userProfile } from "@app/queries";
import LinkTab from "@components/LinkTab";
import ListItemButtonLink from "@components/ListItemButtonLink";
import {
	alpha,
	List,
	ListItemText,
	Tabs,
	Theme,
	useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { TABS_MAPPING } from "./tabQueryMapping";

interface ProfileNavigationProps {
	selectedTab: string;
	pathname: string;
}

const ProfileNavigation: FC<ProfileNavigationProps> = ({
	selectedTab,
	pathname,
}) => {
	const { data: profile } = useQuery(...userProfile());
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

	return isDesktop ? (
		<List sx={{ p: 0 }}>
			{TABS_MAPPING.filter(isAvailable(profile)).map((tab) => (
				<ListItemButtonLink
					href={`${pathname}?section=${tab.value}`}
					key={tab.value}
					selected={selectedTab === tab.value}
					sx={{
						borderRadius: "4px 4px 0 0",
						"&.Mui-selected": {
							backgroundColor: "brown.100",
							borderBottom: "2px solid",
							borderBottomColor: "primary.main",
						},
						"&.Mui-selected:hover": {
							backgroundColor: (theme) => alpha(theme.palette.brown[100], 0.8),
						},
					}}
				>
					<ListItemText primary={<FormattedMessage id={tab.label} />} />
				</ListItemButtonLink>
			))}
		</List>
	) : (
		<Tabs
			value={selectedTab}
			variant="scrollable"
			scrollButtons="auto"
			sx={{
				"& .MuiTabScrollButton-root.Mui-disabled": {
					opacity: 0.3,
				},
				"& .MuiTabs-flexContainer": {
					width: "fit-content",
					borderBottom: "2px solid",
					borderColor: "brown.100",
				},
			}}
			allowScrollButtonsMobile
		>
			{TABS_MAPPING.filter(isAvailable(profile)).map((tab) => (
				<LinkTab
					key={tab.value}
					label={<FormattedMessage id={tab.label} />}
					href={`${pathname}?section=${tab.value}`}
					value={tab.value}
				/>
			))}
		</Tabs>
	);
};

export default ProfileNavigation;
