import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";

const JWT_KEY = "kw_jwt";

export const getJwt = (ctx?: GetServerSidePropsContext) => {
	if (!ctx) {
		return Cookies.get(JWT_KEY) || "";
	}

	return ctx.req.cookies[JWT_KEY] || "";
};

export const setJwt = (jwt: string) => {
	Cookies.set(JWT_KEY, jwt, { expires: 365 });
};
