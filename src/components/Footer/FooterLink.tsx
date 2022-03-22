import { Typography } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

interface FooterLinkProps extends Pick<LinkProps, "href"> {}

const FooterLink: FC<FooterLinkProps> = ({ href, children }) => {
	return (
		<Link href={href} passHref>
			<Typography
				component="a"
				sx={{
					color: "brown.200",
					textDecoration: "none",
				}}
			>
				{children}
			</Typography>
		</Link>
	);
};

export default FooterLink;
