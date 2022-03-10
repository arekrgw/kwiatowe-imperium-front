import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

const menuConfiguration = [
	{
		name: "Strona główna",
		href: "/",
		Icon: HomeIcon,
	},
	{
		name: "Rośliny",
		href: "/flowers",
		Icon: LocalFloristIcon,
	},
	{
		name: "Konto",
		href: "/account",
		Icon: PersonIcon,
	},
];

export default menuConfiguration;
