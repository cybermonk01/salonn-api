import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      default: false,
    },
    readBySeller: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
