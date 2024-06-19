import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admincomponents/Sidebar";
import { CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { toastOptions } from "../../utils/toastOptions";
import { toast } from "react-toastify";
import { upload } from "../../utils/upload";
import { motion } from "framer-motion";

const AdminUpdateProduct = () => {
  const location = useLocation();
  //   const data = location.state.data;
  const { data } = location.state;

  const [firstImg, setFirstImg] = useState(null);
  const [secondImg, setSecondImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    title: data.title,
    category: data.category,
    desc: data.desc,
    isLatest: data.isLatest,
    oldPrice: data.oldPrice,
    price: data.price,
    images: data.images,
  });

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIslatest = (e) => {
    setProduct((prev) => {
      return { ...prev, isLatest: e.target.checked };
    });
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (product) => {
      return newRequest.put(`/products/${data._id}`, product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const firstUrl = firstImg ? await upload(firstImg) : data.images[0];
      const secondUrl = secondImg ? await upload(secondImg) : data.images[1];
      await mutation.mutateAsync({
        ...product,
        images: [firstUrl, secondUrl],
      });
      navigate("/admin/products");
      setLoading(false);
      toast("Product has been updated", toastOptions);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      <div className="m-auto">
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
          className="bg-orange-300 rounded-lg p-5 flex flex-col md:pr-5 pr-8"
        >
          <form
            className="flex flex-col gap-3 lg:w-[600px] md:w-[400px] w-[380px]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-semibold text-center mb-5">Update</h1>
            <div className="flex gap-5">
              <div className="w-1/2 flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="pl-1 py-1 rounded-md text-gray-500"
                    type="text"
                    name="title"
                    id="title"
                    value={product.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="category">
                    Category
                  </label>
                  <select
                    className="pl-1 py-1 rounded-md text-gray-500"
                    name="category"
                    id="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <option value="Milk Tea">Milk Tea</option>
                    <option value="Bubble Tea">Bubble Tea</option>
                    <option value="Fruit Tea">Fruit Tea</option>
                    <option value="Apple Tea">Apple Tea</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="desc">
                    Description
                  </label>
                  <textarea
                    className="pl-1 py-1 rounded-md text-gray-500"
                    name="desc"
                    id="desc"
                    cols="30"
                    rows="5"
                    value={product.desc}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex items-center toggle">
                  <label className="text-lg font-medium" htmlFor="isLatest">
                    isLatest
                  </label>
                  <label className="text-gray-400 text-lg relative inline-block w-[50px] h-6 switch">
                    <input
                      className="opacity-0 w-0 h-0"
                      type="checkbox"
                      id="isLatest"
                      name="isLatest"
                      checked={product.isLatest}
                      onChange={handleIslatest}
                    />
                    <span className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer bg-[#ccc] rounded-3xl slider"></span>
                  </label>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-3">
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="oldPrice">
                    Old Price
                  </label>
                  <input
                    className="pl-1 py-1 rounded-md text-gray-500"
                    type="number"
                    name="oldPrice"
                    id="oldPrice"
                    value={product.oldPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="pl-1 py-1 rounded-md text-gray-500"
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium">Images</h1>
                  <div className="flex items-center gap-5 mt-3">
                    <label className="text-lg font-medium" htmlFor="firstImg">
                      First Image
                      {firstImg ? (
                        <img
                          className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                          src={URL.createObjectURL(firstImg)}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                          src={product.images[0] || "/img/noavatar.jpg"}
                          alt=""
                        />
                      )}
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id="firstImg"
                      accept="images/*"
                      onChange={(e) => setFirstImg(e.target.files[0])}
                    />
                    <label className="text-lg font-medium" htmlFor="secondImg">
                      Second Image
                      {secondImg ? (
                        <img
                          className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                          src={URL.createObjectURL(secondImg)}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                          src={product.images[1] || "/img/noavatar.jpg"}
                          alt=""
                        />
                      )}
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id="secondImg"
                      accept="images/*"
                      onChange={(e) => setSecondImg(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 rounded-md p-1 text-white text-lg font-medium active:scale-90 duration-100 transition-all flex items-center justify-center"
              type="submit"
            >
              {loading ? (
                <CircularProgress color="inherit" size="28px" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;
