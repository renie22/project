import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Header = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { margin: "-300px" });

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
    <div
      ref={headerRef}
      id="#"
      className="h-[calc(100vh-70px)] bg-gradient-to-b from-orange-300 dark:bg-black"
    >
      <motion.div
        variants={textVariants}
        animate={headerInView ? "animate" : {}}
        initial="initial"
        className="layout h-full flex flex-col gap-10 justify-center items-center md:flex-row md:justify-between md:gap-20"
      >
        <motion.div
          variants={textVariants}
          className="md:order-2 md:w-1/2 flex items-center justify-center"
        >
          <img
            className="h-[300px] w-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] object-cover hover:-rotate-[25deg] duration-200"
            src="/img/milktea.png"
            alt=""
          />
        </motion.div>
        <motion.div
          variants={textVariants}
          className="md:order-1 md:w-1/2 space-y-5"
        >
          <motion.h3
            variants={textVariants}
            className="flex items-center text-xl font-medium text-gray-700 dark:text-white/70"
          >
            Freshly Brewed
            <img
              className="h-10 w-10 rounded-full"
              src="/img/logo.png"
              alt=""
            />
          </motion.h3>
          <motion.h1
            variants={textVariants}
            className="text-3xl font-bold text-gray-700 dark:text-white"
          >
            A Tasty Taiwanese Drink with Chewy Tapioca Pearls
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="text-gray-600 dark:text-white/70 text-justify"
          >
            This is the most basic and traditional form of bubble tea. It
            features a blend of black tea, milk, and sugar, with the added
            texture of the tapioca pearls.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
