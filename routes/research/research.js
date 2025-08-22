import express from "express";
import { getResearchProjects } from "../../controllers/research/researchController.js";

const router = express.Router();

router.get("/", getResearchProjects);

export default router;
