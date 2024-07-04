import Product from "../models/product.model.js";
import { createError } from "../utils/createError.js";

export const createProduct = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(createError(403, "Admin only"));
  }
  const product = await Product.findOne({ title: req.body.title });
  if (product) {
    return next(createError(403, "The product title already exists"));
  }

  try {
    const newProduct = new Product({ ...req.body, userId: req.userId });
    await newProduct.save();

    res.status(200).send("Product has been created");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(createError(403, "Admin only"));
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).send("Product has been updated");
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(createError(403, "Admin only"));
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).send("Product has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(createError(404, "Product not found"));
    }

    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  const q = req.query;
  const excludeId = q.excludeId;

  const filters = {
    ...(q.category && { category: q.category }),
    ...(q.isLatest && { isLatest: q.isLatest }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    _id: { $ne: excludeId },
  };

  try {
    const products = await Product.find(filters).sort({ createdAt: -1 });
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};
