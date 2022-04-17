/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["pl", "en"],
		defaultLocale: "pl",
		localeDetection: true,
	},
	images: {
		domains: ["localhost", "vps-8f870bb8.vps.ovh.net"],
	},
};

module.exports = nextConfig;
