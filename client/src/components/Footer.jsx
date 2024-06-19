import React, { useRef } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link, useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const Footer = () => {
  const { pathname } = useLocation();
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true });

  const textVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div ref={footerRef} className="h-[175px] dark:bg-black/90 dark:text-white">
      <motion.div
        variants={textVariants}
        initial="initial"
        animate={footerInView ? "animate" : {}}
        className="layout h-full flex flex-col justify-center"
      >
        <div className="flex justify-between">
          <motion.div variants={textVariants}>
            <h1 className="font-medium mb-5">Bubble Tea Social Media</h1>
            <div className="flex gap-5">
              <div className="w-10 h-10 rounded-full text-white bg-[#3b5999] flex items-center justify-center">
                <FacebookIcon />
              </div>
              <div className="w-10 h-10 rounded-full text-white bg-[#e4405f] flex items-center justify-center">
                <InstagramIcon />
              </div>
              <div className="w-10 h-10 rounded-full text-white bg-[#55acee] flex items-center justify-center">
                <TwitterIcon />
              </div>
              <div className="w-10 h-10 rounded-full text-white bg-[#e60023] flex items-center justify-center">
                <PinterestIcon />
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={textVariants}
            className="hidden md:flex flex-col"
          >
            <h1 className="font-medium sm:mb-5 mb-2">Useful Links</h1>
            <ul className="text-gray-400 font-light">
              {pathname !== "/" ? (
                <Link to="/">
                  <li>Home</li>
                </Link>
              ) : (
                <li>
                  <a href="#">Home</a>
                </li>
              )}
              {pathname !== "/" ? (
                <Link to="/">
                  <li>About</li>
                </Link>
              ) : (
                <li>
                  <a href="#about">About</a>
                </li>
              )}
              {pathname !== "/" ? (
                <Link to="/">
                  <li>Menu</li>
                </Link>
              ) : (
                <li>
                  <a href="#menu">Menu</a>
                </li>
              )}
            </ul>
          </motion.div>
          <motion.div variants={textVariants} className="flex flex-col">
            <h3 className="mb-2 font-medium">Contact</h3>
            <div className="mb-1 flex items-center gap-2 text-gray-400 font-light">
              <RoomIcon /> 123 Street , Manila 456
            </div>
            <div className="mb-1 flex items-center gap-2 text-gray-400 font-light">
              <PhoneIcon /> +1 234 56 78
            </div>
            <div className="mb-1 flex items-center gap-2 text-gray-400 font-light">
              <MailOutlineIcon /> contact@arfan
            </div>
            <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
