import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { newRequest } from "../utils/newRequest";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";

const UpdateReview = ({ review, setOpen }) => {
  const [userReview, setUserReview] = useState({
    desc: review.desc,
    star: review.star,
  });

  const handleChange = (e) => {
    setUserReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedReview) => {
      return newRequest.put(`/reviews/${review._id}`, updatedReview);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["product"]);
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const star = parseInt(userReview.star);

    try {
      const res = await mutation.mutateAsync({ ...userReview, star });
      setOpen(false);
      toast(res.data, toastOptions);
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <div className="flex gap-2">
          <textarea
            className="border rounded-md p-1 dark:text-black"
            name="desc"
            id=""
            cols="22"
            rows="5"
            value={userReview.desc}
            onChange={handleChange}
          ></textarea>
          <div className="flex flex-col">
            <label htmlFor="star">Star</label>
            <select
              className="border rounded-md dark:border-gray-700 dark:bg-transparent dark:text-white"
              name="star"
              id="star"
              value={userReview.star}
              onChange={handleChange}
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
          className="bg-green-500 px-1 text-white rounded-md my-2"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateReview;
