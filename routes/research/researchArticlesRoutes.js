import express from "express";
import { getResearchArticles, createResearchArticle } from "../../controllers/research/researchArticlesController.js";

const router = express.Router();

// GET: fetch all articles
router.get("/", getResearchArticles);

// POST: add new article
router.post("/add", createResearchArticle);

export default router;
