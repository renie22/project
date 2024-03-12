import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  decreaseQuantity,
  removeToCart,
  reset,
  resetCart,
  setCloseCart,
} from "../redux/cartSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CircularProgress from "@mui/material/CircularProgress";
import { loadStripe } from "@stripe/stripe-js";
import { newRequest } from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const cartState = useSelector((state) => state.cart.cartState);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const carts = useSelector((state) => state.cart.carts);
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCart = () => {
    dispatch(
      setCloseCart({
        cartState: false,
      })
    );
  };

  const totalPrice = () => {
    let total = 0;
    carts.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_51NkzcdE3ytvV3efyWw66560XgjBsrcVYpZn4nB1DqlKPpjMti80v33XLpgtTDmSth1eX09MELO1zMsjDNx1cxbni00bxQMzXqe"
  );

  const buyerName = currentUser?.username;
  const buyerImg = currentUser?.img;
  const totalAmount = totalPrice();

  const handleCheckout = async () => {
    if (!currentUser) {
      toggleCart();
      navigate("/register");
      return;
    }

    setLoading(true);
    try {
      const stripe = await stripePromise;

      const res = await newRequest.post("/orders/create-checkout-session", {
        carts,
        buyerName,
        buyerImg,
        totalAmount,
      });
      dispatch(reset());
      await stripe.redirectToCheckout({ sessionId: res.data.stripeSession.id });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <div
      className={
        cartState
          ? "absolute top-[70px] left-0 h-screen w-full bg-black/70 flex justify-end z-[60]"
          : "hidden"
      }
    >
      <div className="xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full bg-slate-100 text-black p-5 flex flex-col sticky top-0 dark:bg-green-800 dark:text-white">
        <div className="flex gap-2 font-semibold">
          <span onClick={toggleCart}>
            <KeyboardDoubleArrowLeftIcon className="text-blue-500 dark:text-red-500 cursor-pointer" />
          </span>
          <h1 className="mb-8 text-gray-500  font-normal text-lg dark:text-white">
            Your Cart
            <span className="text-red-500 ml-2 dark:text-yellow-500">
              ({totalQuantity} {totalQuantity <= 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
        <div className="h-[550px] overflow-x-hidden px-2 user">
          {carts.map((item) => (
            <div className="flex justify-between mt-5" key={item.id}>
              <div className="flex gap-2">
                <img
                  className="h-[100px] w-[80px] object-cover border"
                  src={item.img}
                  alt=""
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h1>{item.title}</h1>
                    <h1 className="text-sm text-gray-400">{item.category}</h1>
                  </div>
                  <h1 className="text-lg font-medium">${item.price}</h1>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="h-7 w-7 border flex items-center justify-center font-medium text-lg"
                  onClick={() => {
                    dispatch(decreaseQuantity({ id: item.id }));
                    toast(`QTY decreased`, toastOptions);
                  }}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="h-7 w-7 border flex items-center justify-center font-medium text-lg"
                  onClick={() => {
                    dispatch(addQuantity({ id: item.id }));
                    toast(`QTY increased`, toastOptions);
                  }}
                >
                  +
                </button>
              </div>
              <div className="flex flex-col justify-between items-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-1 rounded-md active:scale-90 duration-100 transition-all"
                  onClick={() => {
                    dispatch(removeToCart({ id: item.id }));
                    toast(
                      `${item.title} has been removed to cart`,
                      toastOptions
                    );
                  }}
                >
                  Delete
                </button>
                <h1 className="text-lg font-medium">
                  ${item.price * item.quantity}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between">
          <h1 className="text-lg font-medium">SUBTOTAL</h1>
          <h1 className="text-lg font-medium">${totalPrice()}</h1>
        </div>
        <span
          className="text-sm text-red-500 cursor-pointer mt-1"
          onClick={() => {
            dispatch(resetCart());
            toast(`cart reset`, toastOptions);
          }}
        >
          Reset
        </span>
        <button
          className="bg-orange-500 hover:bg-orange-600 p-1 text-white text-lg font-medium rounded-md active:scale-90 duration-100 transition-all mt-5 flex items-center justify-center"
          onClick={handleCheckout}
        >
          {loading ? (
            <CircularProgress color="inherit" size="28px" />
          ) : (
            "PROCEED TO CHECKOUT"
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
