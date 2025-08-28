import express from "express";
import { addArticle, getPageData } from "../controllers/pageController.js";

const router = express.Router();

router.get("/:modelName", getPageData);
router.post("/:modelName/add", addArticle);

export default router;
