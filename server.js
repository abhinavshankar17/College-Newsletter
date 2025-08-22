import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Correct paths
import cloudComputingRoutes from "./routes/specialization/cloudComputing.js";
import cyberSecurityRoutes from "./routes/specialization/cyberSecurity.js";
import researchRoutes from "./routes/research/research.js"; 

dotenv.config();
const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/research", researchRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/college_newsletter")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to College Newsletter 🚀");
});

// Routes
app.use("/specialization/cloud-computing", cloudComputingRoutes);
app.use("/specialization/cyber-security", cyberSecurityRoutes);

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
