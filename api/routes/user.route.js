import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateAdmin,
  updatePass,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/find/:id", getUser);
router.get("/", verifyToken, getAllUser);
router.put("/password/:id", verifyToken, updatePass);
router.put("/status/:id", verifyToken, updateAdmin);

export default router;
