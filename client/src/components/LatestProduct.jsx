import React, { useRef } from "react";
import { newRequest } from "../utils/newRequest";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { motion, useInView } from "framer-motion";

const LatestProduct = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["isLatest"],
    queryFn: () =>
      newRequest.get(`/products?isLatest=true`).then((res) => {
        return res.data;
      }),
  });

  const latestProductRef = useRef(null);
  const latestProductInView = useInView(latestProductRef, {
    margin: "-300px",
  });

  return (
    <div
      ref={latestProductRef}
      id="menu"
      className="h-screen dark:bg-black/80 dark:text-white"
    >
      <div className="layout h-full flex flex-col justify-center">
        <motion.h1
          initial={{ x: "-100px" }}
          animate={latestProductInView ? { x: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold py-10"
        >
          Latest Product
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            latestProductInView
              ? { opacity: 1, scale: 1, transition: { duration: 0.7 } }
              : {}
          }
        >
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
                  <div>
                    <Card key={product._id} product={product} isLatest />
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default LatestProduct;
