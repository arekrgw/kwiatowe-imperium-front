/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["pl", "en"],
		defaultLocale: "pl",
	},
	images: {
		domains: ["localhost"],
	},
};

module.exports = nextConfig;
