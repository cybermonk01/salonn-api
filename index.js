import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import ConversationsRoutes from "./routes/conversation.routes.js";
import MessagesRoutes from "./routes/message.routes.js";
import ReviewsRoutes from "./routes/review.routes.js";
import OrdersRoutes from "./routes/order.routes.js";
import gigsRoutes from "./routes/gig.routes.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import createError from "./utils/createError.js";

const app = express();
const PORT = 5000 || process.env.PORT;

const connect = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (error) {
    console.log("error", error);
  }
};

connect();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.options("*", cors());
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

const oAuth2Client = new OAuth2Client(
  process.env.OAUTH_API,
  process.env.OAUTH_API_SECRET
);

async function verify(req, res, next) {
  try {
    const authHeader = req.headers.authorizations;
    if (!authHeader) {
      next(createError.Unauthorized());
    }
    const token = authHeader.split(" ")[1];

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_API,
    });

    const payload = ticket.getPayload();
    if (payload) {
      req.userId = payload["sub"];
      next();
      return;
    }
    next(createError.Unauthorized());
  } catch (err) {
    next(err);
  }
}

app.get("/", (req, res, next) => {
  res.send({ message: "Awesome🚀, We are Live!" });
});
app.get("/api/register", async (req, res, next) => {
  res.send({ message: "awesome New User is Registered" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigsRoutes);
app.use("/api/conversations", ConversationsRoutes);
app.use("/api/orders", OrdersRoutes);
app.use("/api/messages", MessagesRoutes);
app.use("/api/reviews", ReviewsRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port : ${PORT}`);
});
