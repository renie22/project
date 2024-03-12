import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/createError.js";

export const createUser = async (req, res, next) => {
  if (req.isAdmin) {
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

      res.status(200).send("User has been created");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      if (!updatedUser) return next(createError(404, "User not found"));

      const { password, ...info } = updatedUser._doc;
      res.status(200).send(info);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return next(createError(404, "User not found"));

      res.status(200).send("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));

    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  if (req.isAdmin) {
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
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const updateAdmin = async (req, res, next) => {
  if (req.isAdmin) {
    try {
      const isAdmin = req.body.isAdmin;

      if (typeof isAdmin !== "boolean") {
        return next(createError(400, "isAdmin must be a boolean value"));
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isAdmin },
        { new: true }
      );

      if (!user) return next(createError(404, "User not found"));

      res.status(200).send("Status has been updated");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const updatePass = async (req, res, next) => {
  if (req.params.id === req.user.id || req.isAdmin) {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 5);
    }

    try {
      const updatedPass = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).send(updatedPass);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update password only your account"));
  }
};
