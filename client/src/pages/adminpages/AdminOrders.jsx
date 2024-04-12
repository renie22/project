import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admincomponents/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "timeago.js";
import { CircularProgress } from "@mui/material";

const AdminOrders = () => {
  const [search, setSearch] = useState("");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`orders?search=${search}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      <div className="px-5 flex w-[1400px] mx-auto">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">Orders</h1>
          <input
            className="border-b border-gray-400 w-[200px] bg-transparent placeholder:text-gray-500 my-2"
            type="text"
            placeholder="Search User..."
            onChange={(e) => setSearch(e.target.value)}
          />
          {isLoading ? (
            <div className="h-[720px">
              <CircularProgress color="inherit" size="28px" />
            </div>
          ) : error ? (
            "Something went wrong"
          ) : data.length === 0 ? (
            <div className="h-[720px]">
              <h1 className="flex items-center justify-center h-full text-2xl font-bold">
                No order
              </h1>
            </div>
          ) : (
            <div className="h-[720px] overflow-x-hidden custom-scrollbar">
              <TableContainer component={Paper} className="dark:bg-black/80">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="dark:text-white hidden md:block">
                        Order ID
                      </TableCell>
                      <TableCell className="dark:text-white">
                        Costumer
                      </TableCell>
                      <TableCell className="dark:text-white">Items</TableCell>
                      <TableCell className="dark:text-white">Amount</TableCell>
                      <TableCell className="dark:text-white">Date</TableCell>
                      <TableCell className="dark:text-white">
                        Payment Method
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="dark:text-white">
                          {order._id}
                        </TableCell>
                        <TableCell className="dark:text-white">
                          <div className="flex items-center gap-1">
                            <img
                              className="h-7 w-7 object-cover rounded-full"
                              src={order.buyerImg || "/img/noavatar.jpg"}
                              alt=""
                            />
                            <span>{order.buyerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-white">
                          {order.carts.map((item) => (
                            <div
                              className="flex items-center gap-1 mb-4"
                              key={item.id}
                            >
                              {item.quantity}
                              <span className="mr-5">X</span>
                              <img
                                className="h-7 w-7 object-cover rounded-full"
                                src={item.img}
                                alt=""
                              />
                              {item.title}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell className="dark:text-white">
                          ${order.totalAmount}
                        </TableCell>
                        <TableCell className="dark:text-white">
                          {format(order.createdAt)}
                        </TableCell>
                        <TableCell className="dark:text-white">
                          Online
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
