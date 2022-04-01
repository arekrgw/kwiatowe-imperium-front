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

interface ProfileNavigationProps {
	selectedTab: string;
	pathname: string;
}

export const TABS_MAPPING = [
	{ label: "profile.tab.details", value: "details" },
	{ label: "profile.tab.orders", value: "orders" },
	{ label: "profile.tab.addresses", value: "addresses" },
	{ label: "profile.tab.calendar", value: "calendar" },
];

const ProfileNavigation: FC<ProfileNavigationProps> = ({
	selectedTab,
	pathname,
}) => {
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

	return isDesktop ? (
		<List sx={{ p: 0 }}>
			{TABS_MAPPING.map((tab) => (
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
			{TABS_MAPPING.map((tab) => (
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
