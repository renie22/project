import React from "react";

const Header = () => {
  return (
    <div
      id="home"
      className="flex justify-center h-[93vh] bg-gradient-to-b from-orange-300 dark:bg-black xl:pt-0 sm:pt-[100px] pt-[120px]"
    >
      <div className="w-[1400px] h-full flex md:flex-row flex-col md:justify-between items-center gap-20 md:p-5 p-2">
        <div className="md:w-1/2 w-full flex flex-col md:items-start items-center gap-5">
          <h3 className="flex items-center text-xl font-medium text-gray-700 dark:text-white/70">
            Freshly Brewed
            <img
              className="h-10 w-10 rounded-full"
              src="/img/logo.png"
              alt=""
            />
          </h3>
          <h1 className="text-3xl font-bold text-gray-700 dark:text-white">
            A Tasty Taiwanese Drink with Chewy Tapioca Pearls
          </h1>
          <p className="text-gray-600 dark:text-white/70 text-justify">
            This is the most basic and traditional form of bubble tea. It
            features a blend of black tea, milk, and sugar, with the added
            texture of the tapioca pearls.
          </p>
        </div>
        <div className="md:w-1/2 w-full order-first md:order-last flex flex-col items-center">
          <img
            className="md:w-[350px] md:h-[350px] sm:w-[300px] sm:h-[300px]  lg:w-[500px] lg:h-[500px] object-cover hover:-rotate-[25deg] duration-200 w-[300px] h-[300px]"
            src="/img/milktea.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
