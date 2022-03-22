import { Box, Stack, Typography } from "@mui/material";
import Image from "@components/Image";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import FooterLink from "./FooterLink";

interface FooterProps {}

const Footer = (props: FooterProps) => {
	return (
		<Box
			sx={(theme) => ({
				backgroundColor: "brown.900",
				p: "50px 20px",
				color: "#fff",
			})}
		>
			<Image
				src={"/logo2x.png"}
				alt="kwiatowe-imperium-logo"
				sx={{
					width: "200px",
				}}
			/>
			<Stack
				sx={(theme) => ({
					gap: "4px",
					mt: "10px",
					[theme.breakpoints.up("md")]: {
						flexDirection: "row",
						gap: "10px",
						mt: "20px",
					},
				})}
			>
				<FooterLink href="/">
					<FormattedMessage id="footer.delivery" />
				</FooterLink>
				<FooterLink href="/">
					<FormattedMessage id="footer.terms" />
				</FooterLink>
				<FooterLink href="/">
					<FormattedMessage id="footer.returns" />
				</FooterLink>
				<FooterLink href="/">
					<FormattedMessage id="footer.private_policy" />
				</FooterLink>
				<FooterLink href="/">
					<FormattedMessage id="footer.contact" />
				</FooterLink>
			</Stack>
		</Box>
	);
};

export default Footer;
