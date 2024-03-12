import { newRequest } from "../utils/newRequest";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

const LatestProduct = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["isLatest"],
    queryFn: () =>
      newRequest.get(`/products?isLatest=true`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div
      id="menu"
      className="pt-[150px] h-[95vh] dark:bg-black/80 dark:text-white"
    >
      <div className="max-w-[1400px] m-auto">
        <h1 className="text-3xl font-bold py-10 md:p-5 p-2">Latest Product</h1>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1300: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {isLoading ? (
            <CircularProgress color="inherit" size="28px" />
          ) : error ? (
            "Something went wrong"
          ) : (
            data.map((product) => (
              <SwiperSlide
                key={product._id}
                className="dark:text-white flex flex-col items-center"
              >
                <Card key={product._id} product={product} isLatest />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default LatestProduct;
