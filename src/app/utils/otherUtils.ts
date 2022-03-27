export const getPathLocale = (defaultLocale: string, locale?: string) => {
	if (locale === defaultLocale) return "";

	if (!locale) return "";

	return `/${locale}`;
};
