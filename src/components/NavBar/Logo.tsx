import routes from "@app/routes";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {}

const Logo = (props: LogoProps) => {
	return (
		<Link href={routes.home} passHref>
			<Box
				sx={{
					height: "40px",
					width: "100%",
					position: "relative",
				}}
			>
				<Image
					priority
					src="/logo.png"
					alt="kwiatowe-imperium"
					layout="fill"
					objectFit="contain"
				/>
			</Box>
		</Link>
	);
};

export default Logo;
