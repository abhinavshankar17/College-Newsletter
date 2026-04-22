import express from "express";

const router = express.Router();

import { getLectureSeries, addLectureSeries } from "../../controllers/events/LectureSeriesController.js";

router.get("/", getLectureSeries);

router.post("/add", addLectureSeries);

export default router;