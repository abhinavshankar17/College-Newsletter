import express from "express";

const router = express.Router();
import { getAllWorkshop  ,addAllWorkshops} from "../../controllers/events/Workshop.js";
router.get("/",getAllWorkshop);
router.post("/add",addAllWorkshops);
export default router;
