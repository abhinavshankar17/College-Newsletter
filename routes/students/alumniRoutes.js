import express from "express";
import multer from "multer";
import { getAlumniArticles, createAlumniArticle } from "../../controllers/students/alumniController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 🟢 View all alumni articles
router.get("/alumniArticles", getAlumniArticles);

// 🟢 Add a new alumni article
router.post("/alumniArticles", upload.single("alumniImage"), createAlumniArticle);

export default router;
