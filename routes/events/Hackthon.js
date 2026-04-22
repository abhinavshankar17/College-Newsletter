import express from "express";

const router = express.Router();

import { getHackathons, addHackathon } from "../../controllers/events/HackthonController.js";

router.get("/", getHackathons);
router.post("/add", addHackathon);

export default router;