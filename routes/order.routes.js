import express from "express";
import {
  confirm,
  createOrder,
  getOrders,
  intent,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", getOrders);

router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;
