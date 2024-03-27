import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    paymentIntent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
