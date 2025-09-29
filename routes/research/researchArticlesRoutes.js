import express from "express";
import { getResearchArticles, createResearchArticle } from "../../controllers/research/researchArticlesController.js";

const router = express.Router();

// GET research articles page
router.get("/", getResearchArticles);

// POST new article (from your dynamic admin form)
router.post("/add", createResearchArticle);

export default router;
