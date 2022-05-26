import { addHours } from "date-fns";
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
	Cookies.set(JWT_KEY, jwt, { expires: addHours(new Date(), 10) });
};

export const removeJwt = () => {
	Cookies.remove(JWT_KEY);
};

export const isAdmin = (profile?: User | null) =>
	!!profile?.roles.find((role) => role.name === "ADMIN");

export const isAvailable = (profile?: User | null) => (t: ITab) =>
	(t.adminOnly && isAdmin(profile)) || !t.adminOnly;
