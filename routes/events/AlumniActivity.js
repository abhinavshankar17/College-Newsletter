import express from "express";

const router = express.Router();
import { getAllAlumniActivities  ,addAllAlumniActivities} from "../../controllers/events/AlumniActivities.js";
router.get("/",getAllAlumniActivities);
router.post("/add",addAllAlumniActivities);
export default router;
