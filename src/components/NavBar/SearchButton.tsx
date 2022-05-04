import SearchModal from "@components/SearchModal";
import SearchIcon from "@mui/icons-material/Search";
import {
	Button,
	DialogContent,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	Theme,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { sharedSx } from "./MobileNavigationListItem";

const SearchButton = () => {
	const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));
	const { mainStore } = useStore();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const handleOpenSearch = (state: boolean, closeMenu = false) => {
		if (closeMenu) {
			mainStore.hideMenu();
		}
		setOpen(state);
	};

	const handleSearch = (search: string) => {
		handleOpenSearch(false, true);
		router.push({ pathname: "/product/search", query: { q: search } });
	};
	return (
		<>
			<Modal
				open={open}
				BackdropProps={{ sx: { backdropFilter: "blur(2px)" } }}
				onClose={(e, reason) => handleOpenSearch(false)}
			>
				<DialogContent>
					<SearchModal onSearch={handleSearch} />
				</DialogContent>
			</Modal>
			{isDesktop ? (
				<Button
					size="small"
					color="secondary"
					variant="contained"
					onClick={(e) => handleOpenSearch(true)}
					sx={{
						backgroundColor: "green.900",
						minWidth: "unset",
						"& .MuiButton-startIcon": { margin: 0 },
					}}
					startIcon={<SearchIcon />}
				/>
			) : (
				<ListItemButton sx={sharedSx} onClick={() => handleOpenSearch(true)}>
					<ListItemIcon
						sx={{ color: "secondary.contrastText", minWidth: "40px" }}
					>
						<SearchIcon />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="h6">
								<FormattedMessage id="menu.search" />
							</Typography>
						}
					/>
				</ListItemButton>
			)}
		</>
	);
};

export default observer(SearchButton);
