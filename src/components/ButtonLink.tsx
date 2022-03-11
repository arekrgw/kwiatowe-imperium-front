import { Button, ButtonProps } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC, forwardRef } from "react";

const ButtonLink: FC<
	ButtonProps & Pick<LinkProps, "replace" | "href" | "prefetch" | "locale">
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
				<Button ref={ref} {...buttonProps}>
					{children}
				</Button>
			</Link>
		);
	}
);

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
