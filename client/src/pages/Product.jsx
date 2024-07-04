import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { newRequest } from "../utils/newRequest";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { addToCart, setOpenCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import Reviews from "../components/Reviews";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      newRequest.get(`/products/find/${id}`).then((res) => {
        return res.data;
      }),
  });

  const toggleCart = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };

  const textVariants = {
    initial: {
      x: -300,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="dark:bg-black/80 dark:text-white py-5">
      {isLoading ? (
        <div className="layout h-screen">
          <CircularProgress color="inherit" size="28px" />
        </div>
      ) : error ? (
        "Something went wrong"
      ) : (
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="layout flex flex-col justify-center"
        >
          <div className="h-[70vh] flex flex-col gap-12 md:flex-row md:gap-5">
            <motion.div
              variants={textVariants}
              className="h-1/2 flex flex-col gap-5 md:h-full md:w-3/5 md:flex-row lg:w-1/2"
            >
              <div className="h-4/5 w-full border rounded-lg md:p-5 dark:border-gray-700 md:order-2 md:h-full">
                <img
                  className="h-full w-full object-contain"
                  src={data.images[selectedImg]}
                  alt=""
                />
              </div>
              <div className="h-1/5 flex items-center gap-5 md:flex-col">
                <div
                  className={`min-h-[80px] w-[60px] lg:h-[90px] lg:w-[90px] border rounded-md dark:border-gray-700 ${
                    selectedImg === 0 ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
                >
                  <img
                    className="h-full w-full object-contain cursor-pointer"
                    src={data.images[0]}
                    alt=""
                    onClick={() => setSelectedImg(0)}
                  />
                </div>
                <div
                  className={`min-h-[80px] w-[60px] lg:h-[90px] lg:w-[90px] border rounded-md dark:border-gray-700 ${
                    selectedImg === 1 ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
                >
                  <img
                    className="h-full w-full object-contain cursor-pointer"
                    src={data.images[1]}
                    alt=""
                    onClick={() => setSelectedImg(1)}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={textVariants}
              className="h-1/2 flex flex-col gap-5 justify-between md:h-full md:w-2/5 lg:w-1/2"
            >
              <div>
                <h1 className="text-lg font-semibold md:text-xl">
                  {data.title}
                </h1>
                <h1 className="text-gray-500 md:text-lg">{data.category}</h1>
                {!isNaN(Math.round(data.totalStars / data.starNumber)) && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <StarIcon fontSize="small" key={i} />
                      ))}
                    <span className="text-lg font-bold mt-0.5">
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
                <div className="hidden md:block mt-5">
                  <h1 className="text-lg text-gray-500">Description</h1>
                  <p className="text-sm text-justify">{data.desc}</p>
                </div>
              </div>
              <div>
                <h1 className="text-gray-500 md:text-lg">Price</h1>
                <div className="flex gap-2">
                  <h1 className="text-gray-400 line-through font-medium md:text-lg">
                    ${data.oldPrice}
                  </h1>
                  <h1 className="font-medium md:text-lg">${data.price}</h1>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  className="h-6 w-6 md:h-8 md:w-8 font-medium flex items-center justify-center border"
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="h-6 w-6 md:h-8 md:w-8 font-medium flex items-center justify-center border"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <div className="flex gap-5 w-full">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all w-full"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: data._id,
                        title: data.title,
                        category: data.category,
                        price: data.price,
                        img: data.images[0],
                        quantity,
                      })
                    );
                    toast(
                      `${quantity} ${data.title} added to cart`,
                      toastOptions
                    );
                  }}
                >
                  Add To Cart
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all w-full"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: data._id,
                        title: data.title,
                        category: data.category,
                        price: data.price,
                        img: data.images[0],
                        quantity,
                      })
                    );
                    toggleCart();
                    toast(
                      `${quantity} ${data.title} added to cart`,
                      toastOptions
                    );
                  }}
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
          <RelatedProduct category={data.category} excludeId={id} />
          <hr className="mt-5 mb-14 dark:border-gray-700" />
          <Reviews productId={id} />
        </motion.div>
      )}
    </div>
  );
};

export default Product;
