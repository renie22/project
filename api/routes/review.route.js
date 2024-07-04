import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  createReview,
  deleteReview,
  getReviews,
  likeReview,
  unlikeReview,
  updateReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/:productId", verifyToken, createReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);
router.get("/:productId", getReviews);
router.put("/like/:id", verifyToken, likeReview);
router.put("/unlike/:id", verifyToken, unlikeReview);

export default router;
