import { MenuItemSingle } from "@app/menuConfiguration";
import { FC } from "react";
import ListItemButtonLink from "@components/ListItemButtonLink";
import { List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores";
import { FormattedMessage } from "react-intl";
import { sharedSx } from "./MobileNavigationListItem";

interface MobileNavigationItemRenderedProps {
	items: MenuItemSingle[];
}

const MobileNavigationItemRendered: FC<MobileNavigationItemRenderedProps> = ({
	items,
}) => {
	const { mainStore } = useStore();

	return (
		<List sx={{ padding: "10px 0 20px 0" }}>
			{items.map((it) => (
				<ListItemButtonLink
					sx={(theme) => ({
						...sharedSx?.(theme),
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
						primary={
							<Typography variant="h6">
								{it.isTranslatable ? (
									<FormattedMessage id={it.name} />
								) : (
									it.name
								)}
							</Typography>
						}
					/>
				</ListItemButtonLink>
			))}
		</List>
	);
};

export default observer(MobileNavigationItemRendered);
