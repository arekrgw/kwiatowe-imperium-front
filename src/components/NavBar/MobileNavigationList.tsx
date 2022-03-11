import menuConfiguration from "@app/menuConfiguration";
import { List } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import MobileNavigationListItem from "./MobileNavigationListItem";

interface MobileNavigationListProps {}

const MobileNavigationList = (props: MobileNavigationListProps) => {
	return (
		<Box sx={{ px: "20px" }}>
			<List>
				{menuConfiguration.map((menuItem) => (
					<MobileNavigationListItem key={menuItem.key} menuItem={menuItem} />
				))}
			</List>
		</Box>
	);
};

export default observer(MobileNavigationList);
