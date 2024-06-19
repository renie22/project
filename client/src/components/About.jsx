import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { margin: "-300px" });

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
      ref={aboutRef}
      id="about"
      className="h-screen dark:bg-black/80 dark:text-white"
    >
      <motion.div
        variants={textVariants}
        initial="initial"
        animate={aboutInView ? "animate" : {}}
        className="layout h-full flex flex-col gap-10 justify-center items-center md:flex-row md:justify-between md:gap-20"
      >
        <motion.div
          variants={textVariants}
          className="md:w-1/2 order-first flex flex-col items-center"
        >
          <img
            className="h-[300px] w-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] object-cover hover:scale-110 duration-200 transition-all"
            src="/img/about.png"
            alt=""
          />
        </motion.div>
        <motion.div className="md:w-1/2 space-y-5">
          <motion.div
            variants={textVariants}
            className="flex flex-col gap-5 md:items-start items-center"
          >
            <motion.h3
              variants={textVariants}
              className="text-xl font-medium text-green-700 dark:text-white/80"
            >
              Why Choose Us
            </motion.h3>
            <motion.h1
              variants={textVariants}
              className="text-3xl font-bold text-gray-700 dark:text-white"
            >
              What Makes Our Product Delicious Ambrosial
            </motion.h1>
            <motion.p
              variants={textVariants}
              className="text-gray-600 dark:text-white/70 text-justify"
            >
              We use only high-quality ingredients to ensure that every cup of
              bubble tea is delicious and refreshing. Our teas are brewed with
              premium loose-leaf tea leaves, and our tapioca balls are cooked to
              perfection for a perfect chewy texture.
            </motion.p>
            <motion.p variants={textVariants}>
              In addition to our commitment to quality, we offer a diverse range
              of flavors to cater to every palate. Whether you're a fan of
              classic milk tea or adventurous fruit blends, our bubble tea menu
              provides a delightful array of choices.
            </motion.p>
          </motion.div>
          {/* MOBILE */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              aboutInView
                ? {
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 0.9, duration: 0.8 },
                  }
                : {}
            }
            className="hidden lg:hidden md:flex items-center self-start mt-5"
          >
            <img className="h-10 w-10" src="/img/quality.png" alt="" />
            <img className="h-10 w-10" src="/img/variety.png" alt="" />
            <img className="h-10 w-10" src="/img/customizable.png" alt="" />
            <img className="h-10 w-10" src="/img/fast.png" alt="" />
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              aboutInView
                ? {
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 0.9, duration: 0.8 },
                  }
                : {}
            }
            className="hidden lg:block"
          >
            <div className="flex sm:flex-row flex-col justify-between gap-5 my-5">
              <div className="w-full h-[80px] border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/quality.png" alt="" />
                <h3 className="text-lg font-semibold">Quality ingredients</h3>
              </div>
              <div className="w-full h-[80px] border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/variety.png" alt="" />
                <h3 className=" text-lg font-semibold">
                  Wide variety of flavors
                </h3>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-between gap-5">
              <div className="w-full h-[80px] border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/customizable.png" alt="" />
                <h3 className=" text-lg font-semibold">Customizable drinks</h3>
              </div>
              <div className="w-full h-[80px] border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/fast.png" alt="" />
                <h3 className=" text-lg font-semibold">
                  Fast and friendly service
                </h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
