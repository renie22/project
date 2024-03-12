import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  createPayment,
  deleteOrder,
  getAllOrder,
  getUserOrder,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, createPayment);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/find/:userId", verifyToken, getUserOrder);
router.get("/", verifyToken, getAllOrder);

export default router;
