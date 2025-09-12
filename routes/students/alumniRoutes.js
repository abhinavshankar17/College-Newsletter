import express from "express";
import multer from "multer";
import { getAlumniArticles, createAlumniArticle } from "../../controllers/studetns/alumniController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// GET alumni articles
router.get("/articles", getAlumniArticles);

// POST new alumni article
router.post("/articles", upload.single("alumniImage"), createAlumniArticle);

export default router;
