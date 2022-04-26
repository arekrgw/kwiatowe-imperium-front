import { PAGE_SIZE } from "@app/apiRoutes";
import MuiPagination from "@mui/material/Pagination";

interface PaginationProps {
	count: number;
	page: number;
	onChange: (value: number) => void;
}

const Pagination = ({ count, onChange, page }: PaginationProps) => {
	return (
		<MuiPagination
			shape="rounded"
			color="primary"
			count={Math.ceil(count / PAGE_SIZE)}
			page={page}
			onChange={(_, p) => onChange(p)}
		/>
	);
};

export default Pagination;
