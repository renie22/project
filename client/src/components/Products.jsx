import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { newRequest } from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { motion, useInView } from "framer-motion";

const Products = () => {
  const [sort, setSort] = useState("");
  const minRef = useRef();
  const maxRef = useRef();
  const productsRef = useRef(null);

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

  const productsInView = useInView(productsRef, { margin: "-300px" });

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
    <div ref={productsRef} className="dark:bg-black/80 dark:text-white pb-5">
      <motion.div
        variants={textVariants}
        initial="initial"
        animate={productsInView ? "animate" : {}}
        className="layout flex flex-col justify-center"
      >
        <motion.h1 variants={textVariants} className="text-xl font-semibold">
          Products
        </motion.h1>
        <div>
          <motion.h3
            variants={textVariants}
            className="text-lg font-medium py-2"
          >
            Category
          </motion.h3>
          <motion.div variants={textVariants} className="flex gap-3">
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
              onClick={() => reSort("Fruit Tea")}
            >
              Fruit Tea
            </button>
          </motion.div>
        </div>
        <div>
          <motion.h3
            variants={textVariants}
            className="text-lg font-medium py-2"
          >
            Sort Price
          </motion.h3>
          <motion.div variants={textVariants} className="flex gap-3">
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
          </motion.div>
        </div>
        <h1 className="text-xl font-semibold text-center my-5">
          {sort === "" ? "All" : sort}
        </h1>
        {isLoading ? (
          <CircularProgress color="inherit" size="28px" />
        ) : error ? (
          "Something went wrong"
        ) : (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={
              productsInView
                ? {
                    y: 0,
                    opacity: 1,
                    transition: { delay: 0.8, duration: 0.8 },
                  }
                : {}
            }
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {data.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Products;
