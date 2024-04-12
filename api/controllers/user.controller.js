import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/createError.js";

export const createUser = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(createError(403, "Admin only"));
  }

  const username = await User.findOne({ username: req.body.username });
  if (username) {
    return next(createError(403, "The username already exists"));
  }

  const email = await User.findOne({ email: req.body.email });
  if (email) {
    return next(createError(403, "The email already exists"));
  }

  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();

    res.status(200).send("User has been created");
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (!req.isAdmin && req.params.id !== req.userId) {
    return next(createError(403, "You can update only your account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }

    const { password, ...info } = updatedUser._doc;
    res.status(200).send(info);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.isAdmin && req.params.id !== req.userId) {
    return next(createError(403, "You can update only your account"));
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).send("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(createError(403, "Admin only"));
  }

  const q = req.query;

  const filters = {
    ...(q.isAdmin && { isAdmin: q.isAdmin }),
    ...(q.fromGoogle && { fromGoogle: q.fromGoogle }),
    ...(q.search && { username: { $regex: q.search, $options: "i" } }),
  };

  try {
    const users = await User.find(filters).sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
