import { prepareApi } from "@app/api";
import { productPageQuery } from "@app/queries";
import PageCenterWrapper from "@components/PageCenterWrapper";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { dehydrate, useQuery } from "react-query";
import { Mousewheel, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
interface ProductPageProps extends IDehydratedState {}

interface Params extends ParsedUrlQuery {
	id: string;
}

export const getServerSideProps: GetServerSideProps<
	ProductPageProps,
	Params
> = async (ctx) => {
	const { id } = ctx.params!;

	if (!id) return { notFound: true };

	const [queryClient, promises, , awaitAll] = prepareApi(ctx);
	promises.push(queryClient.prefetchQuery(...productPageQuery({ id })));

	await awaitAll();

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};

const ProductPage: NextPage<ProductPageProps> = (props) => {
	const { query } = useRouter();
	const { data: product, isLoading } = useQuery(
		...productPageQuery({ id: query.id as string })
	);

	if (!product || isLoading) return null;

	const { images, name } = product;

	return (
		<PageCenterWrapper sx={{ pb: "50px" }}>
			<Typography
				variant="h3"
				component="h1"
				fontWeight="fontWeightMedium"
				sx={(theme) => ({
					[theme.breakpoints.up("md")]: { display: "none" },
				})}
			>
				{name}
			</Typography>
			<Grid
				container
				spacing="15px"
				sx={(theme) => ({
					pt: "20px",
					[theme.breakpoints.up("md")]: { pt: 0 },
				})}
			>
				<Grid item xs={12} md={6}>
					<Swiper
						direction={"horizontal"}
						slidesPerView={1}
						spaceBetween={30}
						navigation={true}
						mousewheel={{
							forceToAxis: true,
							thresholdDelta: 30,
						}}
						pagination={{
							clickable: true,
						}}
						modules={[Mousewheel, Pagination, Navigation]}
						className="productSwiper"
					>
						{images.map((img, i) => (
							<SwiperSlide key={img.id}>
								<Box
									sx={(theme) => ({
										position: "relative",
										height: "100vw",
										width: "100%",
										backgroundColor: "brown.100",
										[theme.breakpoints.up("sm")]: {
											height: "50vw",
										},
										[theme.breakpoints.up("md")]: {
											height: "500px",
										},
										overflow: "hidden",
										borderRadius: "4px",
									})}
								>
									<Image
										src={img.url}
										alt=""
										layout="fill"
										objectFit="contain"
										priority={i === 0}
									/>
								</Box>
							</SwiperSlide>
						))}
					</Swiper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper sx={{ p: "20px" }}>
						<Stack>
							<Typography
								sx={(theme) => ({
									fontSize: "h5.fontSize",
									[theme.breakpoints.up("md")]: {
										fontSize: "h3.fontSize",
									},
								})}
								component="h2"
								fontWeight="fontWeightMedium"
							>
								{product.name}
							</Typography>
							<Typography sx={{ mt: "20px" }}>{product.description}</Typography>
						</Stack>
					</Paper>
				</Grid>
			</Grid>
		</PageCenterWrapper>
	);
};

export default ProductPage;
