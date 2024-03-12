import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/:productId", verifyToken, createReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);
router.get("/:productId", getReviews);

export default router;
