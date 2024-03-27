import express from "express";
import { verify } from "jsonwebtoken";
import {
  allUsers,
  deleteUser,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.send("it works");
// });

router.get("/all", allUsers);
router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyToken, deleteUser);
export default router;
