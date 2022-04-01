import { Box, Stack } from "@mui/material";
import Image from "@components/Image";
import NextImage from "next/image";
import { FormattedMessage } from "react-intl";
import FooterLink from "./FooterLink";

interface FooterProps {}

const PAYMENT_METHODS = [
	{ src: "/googlepay.svg", alt: "googlepay-payment" },
	{ src: "/applepay.svg", alt: "applepay-payment" },
	{ src: "/blik.svg", alt: "blik-payment" },
	{ src: "/przelewy.svg", alt: "przelewy-payment" },
	{ src: "/mastercard.svg", alt: "mastercard-payment" },
	{ src: "/visa.svg", alt: "visa-payment" },
];

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
			<Stack sx={{ flexDirection: "row", gap: "10px", mt: "20px" }}>
				{PAYMENT_METHODS.map((method) => (
					<NextImage key={method.src} width={40} height={20} {...method} />
				))}
			</Stack>
		</Box>
	);
};

export default Footer;
