import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

export const getPathLocale = (ctx: GetServerSidePropsContext) => {
	const { defaultLocale, locale } = ctx;
	if (locale === defaultLocale) return "";

	if (!locale) return "";

	return `/${locale}`;
};

export const useTimedSuccess = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		let handler: NodeJS.Timeout;
		if (show) {
			handler = setTimeout(() => {
				setShow(false);
			}, 3000);
		}

		return () => {
			clearTimeout(handler);
		};
	}, [show]);

	return { show, setShow };
};
