import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";

export const register = async (req, res, next) => {
  const username = await User.findOne({ username: req.body.username });
  if (username) return next(createError(403, "The username already exists"));

  const email = await User.findOne({ email: req.body.email });
  if (email) return next(createError(403, "The email already exists"));

  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    const { password, ...info } = newUser._doc;

    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isPassCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassCorrect)
      return next(createError(403, "User or Pass is incorrect"));

    const { password, ...info } = user._doc;

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out");
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .send(user._doc);
    } else {
      const newUser = new User({ ...req.body, fromGoogle: true });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT
      );
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .send(newUser._doc);
    }
  } catch (error) {
    next(error);
  }
};
