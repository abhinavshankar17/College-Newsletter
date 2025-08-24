import express from "express";
import { getComputerNetworking , addComputerNetworking } from "../../controllers/specialization/ComputerNetworking.js";

const router = express.Router();

// Show page
router.get("/", getComputerNetworking);

// Add new document
router.post("/add", addComputerNetworking);

export default router;
