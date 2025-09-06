import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Debug check for Cloudinary envs (remove in production)
dotenv.config();
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ set" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ set" : "❌ missing",
});

// ✅ Correct paths
import cloudComputingRoutes from "./routes/specialization/cloudComputing.js";
import cyberSecurityRoutes from "./routes/specialization/cyberSecurity.js";
import researchRoutes from "./routes/research/research.js"; 
import computerNetworkingRoutes from "./routes/specialization/ComputerNetworking.js";
import informationTechnologyRoutes from "./routes/specialization/InformationTechnology.js";
import internetOfThingsRoutes from "./routes/specialization/InternetOfThings.js";
import adminRoutes from "./routes/admin.js";

// ✅ NEW: Research Orations routes
import researchOrationRoutes from "./routes/research/researchOrationRoutes.js";

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/college_newsletter")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/research", researchRoutes);
app.use("/specialization/cloud-computing", cloudComputingRoutes);
app.use("/specialization/cyber-security", cyberSecurityRoutes);
app.use("/specialization/computer-networking", computerNetworkingRoutes);
app.use("/specialization/information-technology", informationTechnologyRoutes);
app.use("/specialization/internet-of-things", internetOfThingsRoutes);
app.use("/admin", adminRoutes);
app.use("/research-orations", researchOrationRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to College Newsletter 🚀");
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
