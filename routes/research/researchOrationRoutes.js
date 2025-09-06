import express from "express";
import upload from "../config/upload.js";
import { getAllOrations, createOration } from "../controllers/researchOrationController.js";

const router = express.Router();

router.get("/", getAllOrations);
router.post("/add", upload.single("imageUrl"), createOration);

export default router;
