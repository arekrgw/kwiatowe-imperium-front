import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { FC, forwardRef } from "react";

const Link: FC<
	MuiLinkProps & Pick<LinkProps, "replace" | "href" | "prefetch" | "locale">
> = forwardRef(
	({ replace, href, prefetch, locale, children, ...linkProps }, ref) => {
		return (
			<NextLink
				href={href}
				replace={replace}
				prefetch={prefetch}
				locale={locale}
				passHref
			>
				<MuiLink ref={ref} {...linkProps}>
					{children}
				</MuiLink>
			</NextLink>
		);
	}
);

Link.displayName = "Link";

export default Link;
