import { Button, ButtonProps } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

const ButtonLink: FC<
	ButtonProps & Pick<LinkProps, "replace" | "href" | "prefetch" | "locale">
> = ({ replace, href, prefetch, locale, children, ...buttonProps }) => {
	return (
		<Link
			href={href}
			replace={replace}
			prefetch={prefetch}
			locale={locale}
			passHref
		>
			<Button {...buttonProps}>{children}</Button>
		</Link>
	);
};

export default ButtonLink;
