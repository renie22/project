import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { newRequest } from "../utils/newRequest";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { addToCart, setOpenCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import Reviews from "../components/Reviews";
import { CircularProgress } from "@mui/material";

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

  return (
    <>
      <div className="flex justify-center dark:bg-black/80 dark:text-white">
        <div className="w-[1400px] md:h-[calc(100vh-270px)] h-full md:p-5 p-2">
          {isLoading ? (
            <CircularProgress color="inherit" size="28px" />
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="w-full h-full flex md:flex-row flex-col gap-5 md:items-stretch items-center">
              <div className="w-1/2 flex md:flex-row flex-col gap-5 md:items-start items-center">
                <div className="md:w-1/5 w-full flex md:flex-col flex-row gap-5">
                  <div className="border rounded-md h-[100px] p-2 dark:border-gray-700">
                    <img
                      className="h-full w-full object-cover cursor-pointer"
                      src={data.images[0]}
                      alt=""
                      onClick={() => setSelectedImg(0)}
                    />
                  </div>
                  <div className="border rounded-md h-[100px] p-2 dark:border-gray-700">
                    <img
                      className="h-full w-full object-cover cursor-pointer"
                      src={data.images[1]}
                      alt=""
                      onClick={() => setSelectedImg(1)}
                    />
                  </div>
                </div>
                <div className="md:w-4/5 md:h-full w-[350px] h-[300px] border rounded-lg p-5 dark:border-gray-700 order-first md:order-last">
                  <img
                    className="h-full w-full object-cover"
                    src={data.images[selectedImg]}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-between gap-5">
                <div>
                  <h1 className="text-xl font-semibold">{data.title}</h1>
                  <h1 className="text-lg text-gray-500">{data.category}</h1>
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
                  <div className="mt-5">
                    <h1 className="text-lg text-gray-500">Description</h1>
                    <p className="text-sm text-justify">{data.desc}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <h1 className="text-lg text-gray-500">Price</h1>
                  <div className="flex gap-2">
                    <h1 className="text-gray-400 line-through text-lg font-medium">
                      ${data.oldPrice}
                    </h1>
                    <h1 className="text-lg font-medium">${data.price}</h1>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    className="h-8 w-8 text-lg font-medium flex items-center justify-center border"
                    onClick={() =>
                      setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="h-8 w-8 text-lg font-medium flex items-center justify-center border"
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
              </div>
            </div>
          )}
        </div>
      </div>
      <Reviews productId={id} />
    </>
  );
};

export default Product;
