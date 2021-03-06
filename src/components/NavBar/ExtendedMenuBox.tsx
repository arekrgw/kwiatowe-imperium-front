import { MenuItemExtended, MenuItemSingle } from "@app/menuConfiguration";
import { Stack, Typography, Box } from "@mui/material";
import Link from "@components/Link";
import { ExtendedMenuContent } from "./style";
import { FormattedMessage } from "react-intl";

interface ExtendedMenuProps {
	items: MenuItemSingle[];
	title: string;
}

const ExtendedMenuBox = ({ items, title }: ExtendedMenuProps) => {
	return (
		<ExtendedMenuContent>
			<Typography fontWeight="fontWeightMedium" variant="h6" mb="20px">
				<FormattedMessage id="menu.categories" />
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
							<Typography variant="body1">
								{it.isTranslatable ? (
									<FormattedMessage id={it.name} />
								) : (
									it.name
								)}
							</Typography>
						</Link>
					</Box>
				))}
			</Stack>
		</ExtendedMenuContent>
	);
};

export default ExtendedMenuBox;
