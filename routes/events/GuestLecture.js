import express from "express";

const router = express.Router();
import { getAllLectures  ,addAllLectures} from "../../controllers/events/GuesLecture.js";
router.get("/",getAllLectures);
router.post("/add",addAllLectures);
export default router;
