import { cartQuery, userProfile } from "@app/queries";
import ButtonLink from "@components/ButtonLink";
import { useQuery, useQueryClient } from "react-query";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { FormattedMessage } from "react-intl";
import {
	ListItemIcon,
	ListItemText,
	Button,
	Theme,
	Typography,
	useMediaQuery,
	ListItemButton,
} from "@mui/material";
import { sharedSx } from "./MobileNavigationListItem";
import ListItemButtonLink from "@components/ListItemButtonLink";
import { useStore } from "@stores";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeJwt } from "@app/auth";
import { useRouter } from "next/router";

interface ProfileButtonProps {}

const ProfileButton = (props: ProfileButtonProps) => {
	const { mainStore } = useStore();
	const queryClient = useQueryClient();
	const router = useRouter();
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
	const { data: user } = useQuery(...userProfile());

	const logout = () => {
		removeJwt();
		if (/\/profile.*/.test(router.pathname)) {
			router.replace("/");
		}
		queryClient.removeQueries(userProfile()[0]);
		queryClient.removeQueries(cartQuery()[0]);
	};

	const href = user ? "/profile" : "/signin";
	const Icon = user ? <PersonIcon /> : <LoginIcon />;
	const label = user ? "menu.account" : "menu.signin";

	return isDesktop ? (
		<>
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
			{user && (
				<Button
					variant="contained"
					size="small"
					onClick={logout}
					color="secondary"
					sx={{ backgroundColor: "green.900" }}
					startIcon={<LoginIcon />}
				>
					<FormattedMessage id="menu.logout" />
				</Button>
			)}
		</>
	) : (
		<>
			<ListItemButtonLink
				sx={sharedSx}
				href={href}
				onClick={mainStore.hideMenu}
			>
				<ListItemIcon
					sx={{ color: "secondary.contrastText", minWidth: "40px" }}
				>
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
			{user && (
				<ListItemButton
					sx={sharedSx}
					onClick={() => {
						mainStore.hideMenu();
						logout();
					}}
				>
					<ListItemIcon
						sx={{ color: "secondary.contrastText", minWidth: "40px" }}
					>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6">
								<FormattedMessage id="menu.logout" />
							</Typography>
						}
					/>
				</ListItemButton>
			)}
		</>
	);
};

export default ProfileButton;
