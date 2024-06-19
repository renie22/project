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
import { motion } from "framer-motion";

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
    <div className="h-[calc(100vh-245px)] bg-gradient-to-b from-blue-300 dark:bg-black/80 dark:text-white py-5">
      <div className="layout flex flex-col gap-5">
        <motion.h1
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
          className="text-2xl font-bold"
        >
          Order
        </motion.h1>
        {isLoading ? (
          <CircularProgress color="inherit" size="28px" />
        ) : error ? (
          "Something went wrong"
        ) : data.length === 0 ? (
          <motion.h1
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center h-[570px] text-2xl font-bold"
          >
            No order
          </motion.h1>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-[570px] overflow-x-hidden custom-scrollbar"
          >
            <TableContainer component={Paper} className="dark:bg-black/80">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="dark:text-white">Order ID</TableCell>
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
                            className={`flex items-center gap-1 ${
                              order.carts.length > 1 ? "mb-4" : ""
                            }`}
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
                      <TableCell className="dark:text-white">Online</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Order;
