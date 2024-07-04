import { useQuery } from "@tanstack/react-query";
import React from "react";
import { newRequest } from "../utils/newRequest";
import Card from "./Card";

const RelatedProduct = ({ category, excludeId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products", category, excludeId],
    queryFn: () =>
      newRequest
        .get(`/products?category=${category}&excludeId=${excludeId}`)
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  return (
    <div className="mt-10">
      <h1 className="text-xl font-semibold mb-5">Related Product</h1>
      <div className="flex items-center gap-5">
        {isLoading
          ? "loading"
          : error
          ? "Something went wrong"
          : data.map((product) => (
              <Card key={product._id} product={product} relatedProduct />
            ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
