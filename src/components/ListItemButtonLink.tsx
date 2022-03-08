import { ListItemButtonProps, ListItemButton } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

const ListItemButtonLink: FC<
	ListItemButtonProps &
		Pick<LinkProps, "replace" | "href" | "prefetch" | "locale">
> = ({ replace, href, prefetch, locale, children, ...buttonProps }) => {
	return (
		<Link
			href={href}
			replace={replace}
			prefetch={prefetch}
			locale={locale}
			passHref
		>
			<ListItemButton {...buttonProps}>{children}</ListItemButton>
		</Link>
	);
};

export default ListItemButtonLink;
