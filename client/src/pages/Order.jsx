import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../utils/newRequest";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { CircularProgress } from "@mui/material";

const Order = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser._id;

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () =>
      newRequest.get(`orders/find/${userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="bg-gradient-to-b from-blue-300 dark:bg-black/80 dark:text-white">
      <div className="px-5 flex w-[1400px] mx-auto">
        <div className="flex flex-col gap-2 w-full mb-5">
          <h1 className="text-2xl font-bold mt-5">Order</h1>
          {isLoading ? (
            <div className="h-[586px]">
              <CircularProgress color="inherit" size="28px" />
            </div>
          ) : error ? (
            "Something went wrong"
          ) : data.length === 0 ? (
            <div className="h-[586px]">
              <h1 className="flex items-center justify-center h-full text-2xl font-bold">
                No order
              </h1>
            </div>
          ) : (
            <div className="h-[586px] overflow-x-hidden custom-scrollbar">
              <TableContainer component={Paper} className="dark:bg-black/80">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="dark:text-white">
                        Order ID
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
                          {order.carts.map((item) => (
                            <div
                              className="flex items-center gap-1 mb-4"
                              key={item.id}
                            >
                              {item.quantity}
                              <span className="mr-5">x</span>
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

export default Order;
