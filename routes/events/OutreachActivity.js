import express from "express";

const router = express.Router();
import { getOutreachActivity  ,addOutreachActivity} from "../../controllers/events/OutReach.js";
router.get("/",getOutreachActivity);
router.post("/add",addOutreachActivity);
export default router;
