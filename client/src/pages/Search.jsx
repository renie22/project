import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";
import { newRequest } from "../utils/newRequest";
import Card from "../components/Card";
import { CircularProgress } from "@mui/material";

const Search = () => {
  const { search } = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["products", search],
    queryFn: () =>
      newRequest.get(`/products${search}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="flex justify-center dark:bg-black/80 dark:text-white">
      <div className="w-[1400px] p-5">
        {isLoading ? (
          <div className="h-[626px]">
            <CircularProgress color="inherit" size="28px" />
          </div>
        ) : error ? (
          "Something went wrong"
        ) : data.length === 0 ? (
          <div className="h-[626px]">
            <h1 className="flex items-center justify-center h-full text-2xl font-bold">
              No product found
            </h1>
          </div>
        ) : (
          <div className="min-h-[626px] md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-5 flex flex-col items-center">
            {data.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
