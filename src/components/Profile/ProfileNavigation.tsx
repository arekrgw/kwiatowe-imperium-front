import { isAdmin } from "@app/auth";
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

interface ProfileNavigationProps {
	selectedTab: string;
	pathname: string;
}

interface ITab {
	label: string;
	value: string;
	adminOnly?: true;
}

export const TABS_MAPPING: ITab[] = [
	{ label: "profile.tab.details", value: "details" },
	{ label: "profile.tab.orders", value: "orders" },
	{ label: "profile.tab.addresses", value: "addresses" },
	{ label: "profile.tab.calendar", value: "calendar" },
	{ label: "profile.tab.products", value: "products", adminOnly: true },
	{ label: "profile.tab.categories", value: "categories", adminOnly: true },
	{ label: "profile.tab.hero", value: "hero", adminOnly: true },
	{ label: "profile.tab.users", value: "users", adminOnly: true },
];

const isAvailable = (profile?: User | null) => (t: ITab) =>
	(t.adminOnly && isAdmin(profile)) || !t.adminOnly;

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
