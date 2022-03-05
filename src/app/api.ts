import { DefaultOptions, QueryClient } from "react-query";

export const getQueryClient = (defaultOptions?: DefaultOptions) => {
	return new QueryClient({
		defaultOptions: { queries: { staleTime: 1000 * 5 } },
		...defaultOptions,
	});
};
