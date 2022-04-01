import { userProfile } from "@app/queries";
import ButtonLink from "@components/ButtonLink";
import { useQuery } from "react-query";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { FormattedMessage } from "react-intl";
import {
	ListItemIcon,
	ListItemText,
	Theme,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { sharedSx } from "./MobileNavigationListItem";
import ListItemButtonLink from "@components/ListItemButtonLink";
import { useStore } from "@stores";
interface ProfileButtonProps {}

const ProfileButton = (props: ProfileButtonProps) => {
	const { mainStore } = useStore();
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
	const { data: user } = useQuery(...userProfile());

	const href = user ? "/profile" : "/signin";
	const Icon = user ? <PersonIcon /> : <LoginIcon />;
	const label = user ? "menu.account" : "menu.signin";

	return isDesktop ? (
		<ButtonLink
			variant="contained"
			size="small"
			color="secondary"
			sx={{ backgroundColor: "green.900" }}
			href={href}
			startIcon={Icon}
		>
			<FormattedMessage id={label} />
		</ButtonLink>
	) : (
		<ListItemButtonLink sx={sharedSx} href={href} onClick={mainStore.hideMenu}>
			<ListItemIcon sx={{ color: "secondary.contrastText", minWidth: "40px" }}>
				{Icon}
			</ListItemIcon>
			<ListItemText
				primary={
					<Typography variant="h6">
						<FormattedMessage id={label} />
					</Typography>
				}
			/>
		</ListItemButtonLink>
	);
};

export default ProfileButton;
