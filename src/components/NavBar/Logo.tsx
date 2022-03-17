/* eslint-disable @next/next/no-img-element */
import routes from "@app/routes";
import Image from "@components/Image";
import Link from "next/link";

interface LogoProps {}

const Logo = (props: LogoProps) => {
	return (
		<Link href={routes.home} passHref>
			<Image
				src="/logo.png"
				alt="kwiatowe-imperium"
				sx={{ maxWidth: "300px", height: "40px", cursor: "pointer" }}
			/>
		</Link>
	);
};

export default Logo;
