import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Correct paths
import cloudComputingRoutes from "./routes/specialization/cloudComputing.js";
import cyberSecurityRoutes from "./routes/specialization/cyberSecurity.js";
import researchRoutes from "./routes/research/research.js"; 
import computerNetworkingRoutes from "./routes/specialization/ComputerNetworking.js";
import informationTechnologyRoutes from "./routes/specialization/InformationTechnology.js";
import internetOfThingsRoutes from "./routes/specialization/InternetOfThings.js";

// ✅ Add this import
import adminRoutes from "./routes/admin.js";

dotenv.config();
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

// ✅ Add this line for admin
app.use("/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to College Newsletter 🚀");
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
