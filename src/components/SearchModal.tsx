import { Box, Input, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Controller, useForm } from "react-hook-form";

interface SearchModalProps {
	onSearch: (search: string) => void;
}

type SearchForm = {
	search: string;
};

const SearchModal = ({ onSearch }: SearchModalProps) => {
	const { handleSubmit, control } = useForm<SearchForm>({
		defaultValues: { search: "" },
	});

	const handleSearch = (values: SearchForm) => {
		onSearch(values.search);
	};
	return (
		<form onSubmit={handleSubmit(handleSearch)}>
			<Box
				sx={{
					width: "600px",
					maxWidth: "80vw",
					position: "absolute",
					top: "50px",
					left: "50%",
					transform: "translateX(-50%)",
				}}
			>
				<Controller
					control={control}
					name="search"
					rules={{ required: true }}
					render={({ field }) => (
						<Input
							type="search"
							sx={{
								background: "#fff",
								p: "5px 10px",
								boxSizing: "border-box",
								borderRadius: "4px",
							}}
							fullWidth
							disableUnderline
							startAdornment={
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							}
							placeholder="Search"
							{...field}
						/>
					)}
				/>
			</Box>
		</form>
	);
};

export default SearchModal;
