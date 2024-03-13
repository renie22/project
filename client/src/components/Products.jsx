import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { newRequest } from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

const Products = () => {
  const [sort, setSort] = useState("");
  const minRef = useRef();
  const maxRef = useRef();
  const ref = useRef();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      newRequest
        .get(
          `/products?category=${sort}&min=${minRef.current.value}&max=${maxRef.current.value}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="flex justify-center dark:bg-black/80 dark:text-white overflow-hidden">
      <div className="w-[1400px] p-5" ref={ref}>
        <h1 className="text-xl font-semibold">Products</h1>
        <div>
          <h3 className="text-lg font-medium py-2">Category</h3>
          <div className="flex gap-3">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md active:scale-90 duration-100 transition-all w-[100px] dark:bg-orange-700 dark:hover:bg-orange-600"
              onClick={() => reSort("")}
            >
              All
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md active:scale-90 duration-100 transition-all w-[100px] dark:bg-orange-700 dark:hover:bg-orange-600"
              onClick={() => reSort("Milk Tea")}
            >
              Milk Tea
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md active:scale-90 duration-100 transition-all w-[100px] dark:bg-orange-700 dark:hover:bg-orange-600"
              onClick={() => reSort("Bubble Tea")}
            >
              Bubble Tea
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md active:scale-90 duration-100 transition-all w-[100px] dark:bg-orange-700 dark:hover:bg-orange-600"
              onClick={() => reSort("Apple Tea")}
            >
              Apple Tea
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md active:scale-90 duration-100 transition-all w-[100px] dark:bg-orange-700 dark:hover:bg-orange-600"
              onClick={() => reSort("Fruit Tea")}
            >
              Fruit Tea
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium py-2">Sort Price</h3>
          <div className="flex gap-3">
            <input
              ref={minRef}
              className="pl-1 border  dark:bg-transparent dark:border-gray-600"
              type="number"
              placeholder="min"
            />
            <input
              ref={maxRef}
              className="pl-1 border  dark:bg-transparent dark:border-gray-600"
              type="number"
              placeholder="max"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md active:scale-90 duration-100 transition-all w-[100px] dark:bg-blue-700 dark:hover:bg-blue-600"
              onClick={apply}
            >
              Apply
            </button>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-center my-5">
          {sort === "" ? "All" : sort}
        </h1>
        {isLoading ? (
          <CircularProgress color="inherit" size="28px" />
        ) : error ? (
          "Something went wrong"
        ) : (
          <div className="md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-5 flex flex-col items-center">
            {data.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
