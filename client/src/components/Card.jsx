import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { addToCart, setOpenCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";

const Card = ({ product, isLatest }) => {
  const dispatch = useDispatch();

  let quantity = 1;

  const toggleCart = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };

  return (
    <div
      className={
        isLatest
          ? "border dark:border-gray-700 h-[500px] w-[350px] rounded-lg p-5 dark:bg-black/80 dark:text-white"
          : "border dark:border-gray-700 h-[455px] w-[300px] rounded-lg p-5 dark:bg-black/80 dark:text-white"
      }
    >
      <div className="h-1/2 pb-1">
        <Link to={`/product/${product._id}`}>
          <img
            className="h-full w-full object-cover hover:scale-110 duration-200 transition-all cursor-pointer"
            src={product.images[0]}
            alt=""
          />
        </Link>
      </div>
      <div className="h-1/2 flex flex-col gap-3">
        <div>
          <h1 className="text-lg font-medium">{product.title}</h1>
          <h1 className="text-gray-400">{product.category}</h1>
          <div className="flex items-center gap-1 text-yellow-500">
            <StarIcon fontSize="inherit" />
            {!isNaN(Math.round(product.totalStars / product.starNumber)) && (
              <span className="font-bold mt-0.5">
                {Math.round(product.totalStars / product.starNumber)}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <h1 className="text-gray-400 line-through text-lg font-medium">
            ${product.oldPrice}
          </h1>
          <h1 className="text-lg font-medium">${product.price}</h1>
        </div>
        <button
          className={
            isLatest
              ? "bg-orange-500 hover:bg-orange-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all mt-3"
              : "bg-orange-500 hover:bg-orange-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all"
          }
          onClick={() => {
            dispatch(
              addToCart({
                id: product._id,
                title: product.title,
                category: product.category,
                price: product.price,
                img: product.images[0],
                quantity,
              })
            );
            toast(`${product.title} added to cart`, toastOptions);
          }}
        >
          Add To Cart
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all "
          onClick={() => {
            dispatch(
              addToCart({
                id: product._id,
                title: product.title,
                category: product.category,
                price: product.price,
                img: product.images[0],
                quantity,
              })
            );
            toggleCart();
            toast(`${product.title} added to cart`, toastOptions);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
