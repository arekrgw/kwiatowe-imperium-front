import menuConfiguration from "@app/menuConfiguration";
import ButtonLink from "@components/ButtonLink";
import { Stack } from "@mui/material";

interface DesktopMenuProps {}

const DesktopMenu = (props: DesktopMenuProps) => {
	return (
		<Stack
			direction="row"
			spacing="10px"
			sx={(theme) => ({
				display: "none",
				[theme.breakpoints.up("sm")]: { display: "flex" },
			})}
		>
			{menuConfiguration.map((item) => (
				<ButtonLink
					variant="contained"
					size="small"
					color="secondary"
					sx={{ backgroundColor: "green.900" }}
					key={item.href}
					href={item.href}
					startIcon={<item.Icon />}
				>
					{item.name}
				</ButtonLink>
			))}
		</Stack>
	);
};

export default DesktopMenu;
