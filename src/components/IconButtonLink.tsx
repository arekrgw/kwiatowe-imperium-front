import { IconButton, IconButtonProps } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC, forwardRef } from "react";

const IconButtonLink: FC<
	IconButtonProps & Pick<LinkProps, "replace" | "href" | "prefetch" | "locale">
> = forwardRef(
	({ replace, href, prefetch, locale, children, ...buttonProps }, ref) => {
		return (
			<Link
				href={href}
				replace={replace}
				prefetch={prefetch}
				locale={locale}
				passHref
			>
				<IconButton ref={ref} {...buttonProps}>
					{children}
				</IconButton>
			</Link>
		);
	}
);

IconButtonLink.displayName = "IconButtonLink";

export default IconButtonLink;
