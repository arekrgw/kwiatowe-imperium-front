import { MenuItem } from "@app/menuConfiguration";
import { FC, useState } from "react";
import ListItemButtonLink from "@components/ListItemButtonLink";
import {
	alpha,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SxProps,
	Theme,
	Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface MobileNavigationListItemProps {
	menuItem: MenuItem;
}

const sharedSx: SxProps<Theme> = (theme) => ({
	backgroundColor: "green.700",
	"&:hover": {
		backgroundColor: alpha(theme.palette.green[700], 0.7),
	},
	color: "secondary.contrastText",
	mt: "10px",
	"&:first-of-type": { mt: 0 },
	borderRadius: "5px",
});

const MobileNavigationListItem: FC<MobileNavigationListItemProps> = ({
	menuItem,
}) => {
	const { mainStore } = useStore();
	const [open, setOpen] = useState(false);

	if (menuItem.__typename === "MenuItemSingle") {
		return (
			<ListItemButtonLink
				sx={sharedSx}
				href={menuItem.href}
				onClick={mainStore.hideMenu}
			>
				{menuItem.Icon && (
					<ListItemIcon
						sx={{ color: "secondary.contrastText", minWidth: "40px" }}
					>
						<menuItem.Icon />
					</ListItemIcon>
				)}
				<ListItemText
					primary={<Typography variant="h6">{menuItem.name}</Typography>}
				/>
			</ListItemButtonLink>
		);
	}

	const Icon = menuItem.extended && (open ? ExpandLess : ExpandMore);

	return (
		<>
			<ListItemButton sx={sharedSx} onClick={() => setOpen(!open)}>
				{menuItem.Icon && (
					<ListItemIcon
						sx={{ color: "secondary.contrastText", minWidth: "40px" }}
					>
						<menuItem.Icon />
					</ListItemIcon>
				)}
				<ListItemText
					primary={<Typography variant="h6">{menuItem.name}</Typography>}
				/>
				{Icon && <Icon />}
			</ListItemButton>
			<Collapse in={open} timeout={300}>
				<List sx={{ padding: "10px 0 20px 0" }}>
					{menuItem.extended.map((it) => (
						<ListItemButtonLink
							sx={(theme) => ({
								...sharedSx(theme),
								backgroundColor: "brown.700",
								"&:hover": {
									backgroundColor: theme.palette.brown[500],
								},
							})}
							key={it.key}
							href={it.href}
							onClick={mainStore.hideMenu}
						>
							{it.Icon && (
								<ListItemIcon
									sx={{ color: "secondary.contrastText", minWidth: "40px" }}
								>
									<it.Icon />
								</ListItemIcon>
							)}
							<ListItemText
								primary={<Typography variant="h6">{it.name}</Typography>}
							/>
						</ListItemButtonLink>
					))}
				</List>
			</Collapse>
		</>
	);
};

export default observer(MobileNavigationListItem);
