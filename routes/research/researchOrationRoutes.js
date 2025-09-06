import express from "express";
import { getAllOrations, createOration } from "../../controllers/research/researchOrationController.js";
import upload from "../../utils/upload.js";  // ✅ use multer-cloudinary setup

const router = express.Router();

router.get("/", getAllOrations);
router.post("/add", upload.single("imageUrl"), createOration);

export default router;
