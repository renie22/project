import Review from "../models/review.model.js";
import Product from "../models/product.model.js";
import { createError } from "../utils/createError.js";

export const createReview = async (req, res, next) => {
  if (req.isAdmin) return next(createError(403, "Admin can't create a review"));

  const review = await Review.findOne({
    userId: req.user.id,
    productId: req.params.productId,
  });
  if (review)
    return next(createError(403, "You have already created a review"));

  try {
    const newReview = new Review({
      userId: req.user.id,
      productId: req.params.productId,
      star: req.body.star,
      desc: req.body.desc,
    });
    await newReview.save();

    await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $inc: { totalStars: req.body.star, starNumber: 1 },
      },
      { new: true }
    );

    res.status(201).send("You have created a review");
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) return next(createError(404, "Review not found"));

  if (req.user.id === review.userId) {
    try {
      await Review.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const starDifference = req.body.star - review.star;

      await Product.findByIdAndUpdate(
        review.productId,
        {
          $inc: { totalStars: starDifference },
        },
        { new: true }
      );

      res.status(200).send("Review has been updated");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your review"));
  }
};

export const deleteReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) return next(createError(404, "Review not found"));

  if (req.user.id === review.userId) {
    try {
      await Review.findByIdAndDelete(req.params.id);

      await Product.findByIdAndUpdate(
        review.productId,
        {
          $inc: { totalStars: -review.star, starNumber: -1 },
        },
        { new: true }
      );

      res.status(200).send("Review has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can delete only your review"));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort(
      { createdAt: -1 }
    );
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};
