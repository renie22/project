import React, { useState } from "react";
import DataTable from "../../components/admincomponents/DataTable";
import Sidebar from "../../components/admincomponents/Sidebar";
import AddNewUser from "../../components/admincomponents/AddNewUser";
import { motion } from "framer-motion";

const AdminUsers = () => {
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "username",
      headerName: "Username",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={params.row.img || "/img/noavatar.jpg"}
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", type: "string", headerName: "Email", width: 250 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.isAdmin === true
                ? "p-1 rounded-md text-blue-700 bg-blue-200 w-11 flex items-center justify-center"
                : "p-1 rounded-md  text-orange-700 bg-orange-200 w-11 flex items-center justify-center"
            }
          >
            {params.row.isAdmin ? "true" : "false"}
          </div>
        );
      },
    },
    {
      field: "fromGoogle",
      headerName: "Google",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.fromGoogle === true
                ? "p-1 rounded-md text-blue-700 bg-blue-200 w-11 flex items-center justify-center"
                : "p-1 rounded-md  text-orange-700 bg-orange-200 w-11 flex items-center justify-center"
            }
          >
            {params.row.fromGoogle ? "true" : "false"}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      <div className="px-5 flex w-[1400px] mx-auto mb-5">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
          className="flex flex-col gap-2 w-full"
        >
          <h1 className="text-2xl font-bold">Users</h1>
          <DataTable columns={columns} slugs="users" slug="user" />
          {open && <AddNewUser setOpen={setOpen} />}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md mt-2 w-[135px] active:scale-90 duration-100 transition-all"
            onClick={() => setOpen(true)}
          >
            Add New User
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;
