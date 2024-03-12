import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    carts: {
      type: Array,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    buyerImg: {
      type: String,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
