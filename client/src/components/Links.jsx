import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Links = ({ pathname }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ul className="hidden md:flex items-center gap-3 text-lg font-medium">
      {currentUser?.isAdmin && (
        <Link to="/admin">
          <span className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700">
            Dashboard
          </span>
        </Link>
      )}
      {pathname !== "/" ? (
        <Link to="/">
          <li>
            <span className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700">
              Home
            </span>
          </li>
        </Link>
      ) : (
        <li>
          <a
            className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700"
            href="#"
          >
            Home
          </a>
        </li>
      )}
      {pathname !== "/" ? (
        <Link to="/">
          <li>
            <span className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700">
              About
            </span>
          </li>
        </Link>
      ) : (
        <li>
          <a
            className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700"
            href="#about"
          >
            About
          </a>
        </li>
      )}
      {pathname !== "/" ? (
        <Link to="/">
          <li>
            <span className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700">
              Menu
            </span>
          </li>
        </Link>
      ) : (
        <li>
          <a
            className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700"
            href="#menu"
          >
            Menu
          </a>
        </li>
      )}
      {currentUser && (
        <Link to="/order">
          <li>
            <span className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700">
              Order
            </span>
          </li>
        </Link>
      )}
    </ul>
  );
};

export default Links;
