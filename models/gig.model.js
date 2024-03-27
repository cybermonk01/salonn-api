import mongoose, { Schema } from "mongoose";

const gigSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    totalStars: {
      type: Number,
      required: false,
    },
    starNumber: {
      type: Number,
      required: false,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    desc: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    cat: {
      type: String,
      required: false,
    },
    revisionNumber: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", gigSchema);
