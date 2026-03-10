import express from "express";
const router = express.Router();

import { getProfessionalSocietyEvents } from "../../controllers/events/ProfessionalSocietyEvents.js";

router.get("/", getProfessionalSocietyEvents);

export default router;