import menuConfiguration from "@app/menuConfiguration";
import ListItemButtonLink from "@components/ListItemButtonLink";
import {
	alpha,
	List,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useStore } from "@stores";
import { observer } from "mobx-react-lite";

interface MobileNavigationListProps {}

const MobileNavigationList = (props: MobileNavigationListProps) => {
	const { mainStore } = useStore();
	return (
		<Box sx={{ px: "20px" }}>
			<List>
				{menuConfiguration.map((menuItem) => (
					<ListItemButtonLink
						key={menuItem.href}
						sx={(theme) => ({
							backgroundColor: "green.700",
							color: "secondary.contrastText",
							mt: "10px",
							"&:hover": {
								backgroundColor: alpha(theme.palette.green[700], 0.7),
							},
							"&:first-of-type": { mt: 0 },
							borderRadius: "5px",
						})}
						href={menuItem.href}
						onClick={mainStore.hideMenu}
					>
						<ListItemIcon
							sx={{ color: "secondary.contrastText", minWidth: "40px" }}
						>
							<menuItem.Icon />
						</ListItemIcon>
						<ListItemText
							primary={<Typography variant="h6">{menuItem.name}</Typography>}
						/>
					</ListItemButtonLink>
				))}
			</List>
		</Box>
	);
};

export default observer(MobileNavigationList);
