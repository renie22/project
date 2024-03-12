import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex justify-center dark:bg-black/90 dark:text-white">
        <div className="w-[1400px] sm:h-[175px] h-full flex sm:flex-row flex-col justify-between sm:items-start items-center gap-5 md:p-5 p-2 ">
          <div>
            <h1 className="font-medium sm:mb-5 mb-2 sm:text-left text-center">
              Bubble Tea Social Media
            </h1>
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
          </div>
          <div className="flex flex-col sm:items-start items-center">
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
          </div>
          <div className="flex flex-col sm:items-start items-center">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
