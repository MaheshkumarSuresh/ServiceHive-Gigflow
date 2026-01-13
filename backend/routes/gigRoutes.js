import express from "express";
import { createGig, getGigs, getMyGigs, getGigById } from "../controllers/gigController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", protect, createGig);
router.get("/my", protect, getMyGigs);
router.get("/:id", getGigById);

export default router;
