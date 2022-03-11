import { MenuItem, MenuItemSingle } from "@app/menuConfiguration";
import { Tooltip, useTheme, Stack, Typography, Box } from "@mui/material";
import { FC } from "react";
import Link from "@components/Link";
import { ExtendedMenuContent } from "./style";

interface ExtendedMenuProps {
	items: MenuItemSingle[];
}

const ExtendedMenu = ({ items }: ExtendedMenuProps) => {
	const theme = useTheme();
	return (
		<ExtendedMenuContent>
			<Typography fontWeight="fontWeightMedium" variant="h6" mb="20px">
				Kategorie
			</Typography>
			<Stack flexDirection="column" flexWrap="wrap" height="150px">
				{items.map((it) => (
					<Box
						key={it.key}
						sx={{ flex: "0 0 25%", display: "flex", alignItems: "center" }}
					>
						<Link
							key={it.key}
							href={it.href}
							sx={(theme) => ({
								color: "grey.700",
								textDecoration: "none",
								transition: theme.transitions.create(["color"]),
								"&:hover": {
									color: "#000",
								},
							})}
						>
							<Typography variant="body1">{it.name}</Typography>
						</Link>
					</Box>
				))}
			</Stack>
		</ExtendedMenuContent>
	);
};

export default ExtendedMenu;
