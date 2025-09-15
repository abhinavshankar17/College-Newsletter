import express from "express";
import { getArticles, addArticle } from "../../controllers/faculty/FacultyArticle.js";

const router = express.Router();

// Route to get all faculty articles
router.get("/", getArticles);

// Route to add a new faculty article (form POST)
router.post("/", addArticle);

export default router;
