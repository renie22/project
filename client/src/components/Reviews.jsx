import React from "react";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../utils/newRequest";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Reviews = ({ productId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () =>
      newRequest.get(`/reviews/${productId}`).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post(`/reviews/${productId}`, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      queryClient.invalidateQueries(["product", productId]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const desc = e.target[0].value;
      const star = e.target[1].value;
      const res = await mutation.mutateAsync({ desc, star });
      toast(res.data, toastOptions);

      e.target[0].value = "";
      e.target[1].value = 1;
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };

  const handleInputClick = () => {
    if (!currentUser) {
      navigate("/register");
    }
  };

  return (
    <div className="flex justify-center dark:bg-black/80 dark:text-white">
      <div className="w-[1400px] p-5 flex flex-col sm:items-stretch items-center">
        <hr className="mb-5 dark:border-gray-700" />
        <div className="flex flex-col items-start sm:items-stretch">
          <h1 className="text-xl font-semibold sm:text-left text-center w-full">
            Add a review
          </h1>
          <div className="flex gap-2 mt-5 w-full">
            <img
              className="h-10 w-10 object-cover rounded-full mt-2"
              src={currentUser?.img || "/img/noavatar.jpg"}
              alt=""
            />
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex items-center gap-2">
                <input
                  className="border-b-2 w-full dark:bg-transparent dark:border-gray-700"
                  type="text"
                  placeholder="write your opinion..."
                  onClick={handleInputClick}
                />
                <div className="flex flex-col">
                  <label htmlFor="starNumber">Star Number</label>
                  <select
                    className="border rounded-md w-[100px] dark:border-gray-700 dark:bg-transparent dark:text-white"
                    id="starNumber"
                  >
                    <option value={1} style={{ color: "gray" }}>
                      1
                    </option>
                    <option value={2} style={{ color: "gray" }}>
                      2
                    </option>
                    <option value={3} style={{ color: "gray" }}>
                      3
                    </option>
                    <option value={4} style={{ color: "gray" }}>
                      4
                    </option>
                    <option value={5} style={{ color: "gray" }}>
                      5
                    </option>
                  </select>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 px-1 rounded-md text-white active:scale-90 duration-100 transition-all dark:bg-blue-600 dark:hover:bg-blue-500"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          {isLoading ? (
            <CircularProgress color="inherit" size="28px" />
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="flex flex-col gap-5 mt-5 ">
              {data.map((review) => (
                <Review
                  key={review._id}
                  review={review}
                  productId={productId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
