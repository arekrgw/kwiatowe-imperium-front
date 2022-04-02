import { useTheme } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";

export const GlobalStyle = () => {
	const theme = useTheme();
	return (
		<GlobalStyles
			styles={`
        body {
          background-color: ${theme.palette.grey[200]};
          min-height: 100vh;
          padding-top: 60px;

          ${theme.breakpoints.up("sm")} {
            padding-top: 0;
          }
        }

        .productSwiper {
          .swiper-button-next {
            color: ${theme.palette.secondary.main};
          }

          .swiper-button-prev {
            color: ${theme.palette.secondary.main};
          }

          .swiper-pagination-bullet-active {
            background: ${theme.palette.secondary.main};
          }
        }

      `}
		/>
	);
};
