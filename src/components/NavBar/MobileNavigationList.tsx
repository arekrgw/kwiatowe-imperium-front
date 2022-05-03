import menuConfiguration from "@app/menuConfiguration";
import { List } from "@mui/material";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import MobileNavigationListItem from "./MobileNavigationListItem";
import ProfileButton from "./ProfileButton";
import SearchButton from "./SearchButton";

interface MobileNavigationListProps {}

const MobileNavigationList = (props: MobileNavigationListProps) => {
	return (
		<Box sx={{ px: "20px" }}>
			<List>
				<SearchButton />
				{menuConfiguration.map((menuItem) => (
					<MobileNavigationListItem key={menuItem.key} menuItem={menuItem} />
				))}
				<ProfileButton />
			</List>
		</Box>
	);
};

export default observer(MobileNavigationList);
