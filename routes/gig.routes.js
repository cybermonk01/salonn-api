import express from "express";
import {
  allGigs,
  createGig,
  deleteGig,
  getGig,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/", allGigs);
router.get("/single/:id", verifyToken, getGig);

export default router;
