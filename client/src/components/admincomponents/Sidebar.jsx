import React from "react";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
import PeopleIcon from "@mui/icons-material/People";
import ListIcon from "@mui/icons-material/List";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sm:w-[250px] w-max h-[calc(100vh-90px)] bg-slate-100 p-5 text-gray-600 dark:bg-black/90 dark:text-white sticky top-0">
      <div className="mb-5">
        <h3 className="text-gray-400 font-semibold mb-1 hidden sm:block">
          Dashboard
        </h3>
        <Link to="/admin">
          <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
            <LineStyleIcon />
            <span className="hidden sm:block">Admin</span>
          </div>
        </Link>
        <Link to="/admin/users">
          <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
            <PeopleIcon />
            <span className="hidden sm:block">Users</span>
          </div>
        </Link>
        <Link to="/admin/products">
          <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
            <StorefrontIcon />
            <span className="hidden sm:block">Products</span>
          </div>
        </Link>
        <Link to="/admin/orders">
          <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
            <ListIcon />
            <span className="hidden sm:block">Orders</span>
          </div>
        </Link>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-400 font-semibold mb-1 hidden sm:block">
          Quick Menu
        </h3>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <InventoryIcon />
          <span className="hidden sm:block">Inventory</span>
        </div>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <AttachMoneyIcon />
          <span className="hidden sm:block">Transactions</span>
        </div>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <BarChartIcon />
          <span className="hidden sm:block">Reports</span>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-400 font-semibold mb-1 hidden sm:block">
          Notifications
        </h3>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <MailOutlineIcon />
          <span className="hidden sm:block">Mail</span>
        </div>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <DynamicFeedIcon />
          <span className="hidden sm:block">Feedback</span>
        </div>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <ChatBubbleOutlineIcon />
          <span className="hidden sm:block">Message</span>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-gray-400 font-semibold mb-1 hidden sm:block">
          Notifications
        </h3>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <WorkOutlineIcon />
          <span className="hidden sm:block">Manage</span>
        </div>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <TimelineIcon />
          <span className="hidden sm:block">Analytics</span>
        </div>
        <div className="flex gap-2 p-2 cursor-pointer rounded-lg  hover:bg-blue-200 dark:hover:text-black">
          <ReportIcon />
          <span className="hidden sm:block">Reports</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
