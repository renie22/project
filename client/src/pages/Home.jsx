import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import LatestProduct from "../components/LatestProduct";
import Products from "../components/Products";

const Home = () => {
  return (
    <div>
      <Header />
      <About />
      <LatestProduct />
      <Products />
    </div>
  );
};

export default Home;
