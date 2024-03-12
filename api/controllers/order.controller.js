import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";

export const createPayment = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const { carts, buyerName, buyerImg, totalAmount } = req.body;

  try {
    const lineItems = await Promise.all(
      carts.map(async (product) => {
        const item = await Product.findOne({ _id: product.id });

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.images[0]],
              metadata: {
                id: item.id,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: product.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    const newOrder = new Order({
      userId: req.user.id,
      carts,
      buyerName,
      buyerImg,
      totalAmount,
      stripeId: session.id,
    });
    await newOrder.save();

    res.status(200).send({ stripeSession: session });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  if (req.isAdmin) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedOrder) return next(createError(404, "Order not found"));

      res.status(200).send(updatedOrder);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const deleteOrder = async (req, res, next) => {
  if (req.isAdmin) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) return next(createError(404, "Order not found"));

      res.status(200).send("Order has been deleted.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};

export const getUserOrder = async (req, res, next) => {
  if (req.params.userId === req.user.id) {
    try {
      const orders = await Order.find({ userId: req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can get only your order."));
  }
};

export const getAllOrder = async (req, res, next) => {
  if (req.isAdmin) {
    const q = req.query;

    const filters = {
      ...(q.search && { buyerName: { $regex: q.search, $options: "i" } }),
    };

    try {
      const orders = await Order.find(filters).sort({ createdAt: -1 });
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "Admin only"));
  }
};
