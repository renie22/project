import { createError } from "./createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, async (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }

    req.userId = user.id;
    req.isAdmin = user.isAdmin;
    next();
  });
};
