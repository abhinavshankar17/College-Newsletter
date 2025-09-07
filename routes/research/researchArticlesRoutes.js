import express from "express";
import { getResearchArticles } from "../../controllers/research/researchArticlesController.js";

const router = express.Router();

router.get("/", getResearchArticles);

export default router;
