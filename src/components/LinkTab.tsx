import { Tab, TabProps } from "@mui/material";
import Link from "next/link";

interface LinkTabProps {
	href: string;
}

function LinkTab({ href, ...props }: LinkTabProps & TabProps) {
	return (
		<Link href={href} passHref replace>
			<Tab
				sx={(theme) => ({
					textTransform: "none",
					alignItems: { xs: "center", md: "flex-start" },
					"&.Mui-selected": { backgroundColor: "brown.100" },
					borderRadius: { xs: "4px 4px 0 0", md: "4px 0 0 4px" },
					transition: theme.transitions.create(["background-color"]),
				})}
				{...props}
			/>
		</Link>
	);
}

export default LinkTab;
