import React, { useState } from "react";
import Sidebar from "../../components/admincomponents/Sidebar";
import AddNewProduct from "../../components/admincomponents/AddNewProduct";
import DataTable from "../../components/admincomponents/DataTable";

const AdminProducts = () => {
  const [open, setOpen] = useState(false);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={params.row.images[0] || "/img/noavatar.jpg"}
              alt="_id"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 150 },
    { field: "oldPrice", headerName: "Old Price", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "isLatest",
      headerName: "Latest",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className={
              params.row.isLatest === true
                ? "p-1 rounded-md text-blue-700 bg-blue-200 w-11 flex items-center justify-center"
                : "p-1 rounded-md  text-orange-700 bg-orange-200 w-11 flex items-center justify-center"
            }
          >
            {params.row.isLatest ? "true" : "false"}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      <div className="px-5 flex w-[1400px] mx-auto mb-5">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">Products</h1>
          <DataTable columns={columns} slugs="products" slug="product" />
          {open && <AddNewProduct setOpen={setOpen} />}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md mt-2 w-[135px] active:scale-90 duration-100 transition-all"
            onClick={() => setOpen(true)}
          >
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
