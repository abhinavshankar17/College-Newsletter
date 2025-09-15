import express from "express";
import multer from "multer";
import { getArticles, createArticle } from "../../controllers/students/articleController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/articles", getArticles);
router.post("/articles", upload.single("studentImage"), createArticle);

export default router;
