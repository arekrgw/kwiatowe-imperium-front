import { GetServerSidePropsContext } from "next";

export const getPathLocale = (ctx: GetServerSidePropsContext) => {
	const { defaultLocale, locale } = ctx;
	if (locale === defaultLocale) return "";

	if (!locale) return "";

	return `/${locale}`;
};
