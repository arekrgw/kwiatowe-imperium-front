import { Typography } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

interface FooterLinkProps extends Pick<LinkProps, "href"> {}

const FooterLink: FC<FooterLinkProps> = ({ href, children }) => {
	return (
		<Link href={href} passHref>
			<Typography
				component="a"
				sx={{
					color: "inherit",
					textDecoration: "none",
					"&:visited": { color: "inherit" },
				}}
			>
				{children}
			</Typography>
		</Link>
	);
};

export default FooterLink;
