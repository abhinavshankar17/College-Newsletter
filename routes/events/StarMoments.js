import express from "express";

const router = express.Router();

import { getAllStarMoments, addStarMoment } from "../../controllers/events/StarMoments.js";

router.get("/", getAllStarMoments);

router.post("/add", addStarMoment);

export default router;