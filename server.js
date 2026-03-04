import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";

// MongoDB Connection
mongoose.connect(process.env.ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected (Atlas)"))
.catch(err => console.log("❌ MongoDB Error:", err));


// ✅ Debug check for Cloudinary envs (remove in production)
dotenv.config();
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ set" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ set" : "❌ missing",
});

// ✅ Correct paths
// import cloudComputingRoutes from "./routes/specialization/cloudComputing.js";
// import cyberSecurityRouter from "./routes/specialization/cyberSecurity.js";
// import computerNetworkingRoutes from "./routes/specialization/ComputerNetworking.js";
// import informationTechnologyRoutes from "./routes/specialization/InformationTechnology.js";
// import internetOfThingsRoutes from "./routes/specialization/InternetOfThings.js";
import adminRoutes from "./routes/admin.js";
import researchRoutes from "./routes/research/research.js"; 

import consultancyRoutes from "./routes/faculty/consultancy.js";
import facultyAchivementRoutes from "./routes/faculty/FacultyAchivement.js";
import facultyUpskilling from "./routes/faculty/FacultyUpskilling.js";
import FacultyOnBoard from "./routes/faculty/FacultyOnBoard.js";
import phdScholarRoutes from "./routes/faculty/phdScholar.js";
import FacultyArticle from "./routes/faculty/FacultyArticle.js";

import researchOrationRoutes from "./routes/research/researchOrationRoutes.js";
import researchArticlesRoutes from "./routes/research/researchArticlesRoutes.js";
import studentAchievementsRoutes from "./routes/students/studentAchievements.js";
import activitiesRoutes from "./routes/students/activityRoutes.js";
import articleRoutes from "./routes/students/articleRoutes.js";
// import alumniRoutes from "./routes/students/alumniRoutes.js";

import CelebrationRoutes from "./routes/events/Celebration.js";
import GuestLecture from "./routes/events/GuestLecture.js";
import Workshop from "./routes/events/Workshop.js";
import AlumniActivities from "./routes/events/AlumniActivity.js";
import OutreachActivities from "./routes/events/OutreachActivity.js";

const app = express();

dotenv.config(); // loads .env variables

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "supersecretkey", // change to strong random string
  resave: false,
  saveUninitialized: false
}));


// Routes
app.use("/research", researchRoutes);
// app.use("/specialization/cloud-computing", cloudComputingRoutes);
// app.use("/specialization/cyber-security", cyberSecurityRouter);
// app.use("/specialization/computer-networking", computerNetworkingRoutes);
// app.use("/specialization/information-technology", informationTechnologyRoutes);
// app.use("/specialization/internet-of-things", internetOfThingsRoutes);
app.use("/admin", adminRoutes);
app.use("/research-orations", researchOrationRoutes);

app.use("/consultancy", consultancyRoutes);
app.use("/faculty-achievements", facultyAchivementRoutes);
app.use("/facultyUpskilling", facultyUpskilling);
app.use("/facultyOnBoard", FacultyOnBoard);
app.use("/phdscholars", phdScholarRoutes);
app.use("/FacultyArticle", FacultyArticle);

app.use("/research-articles", researchArticlesRoutes);
// app.use("/students/achievements", studentAchievementsRoutes);
app.use("/students", activitiesRoutes);
app.use("/students", articleRoutes);
// app.use("/students", alumniRoutes);

app.use("/Celebration", CelebrationRoutes);
app.use("/GuestLecture", GuestLecture);
app.use("/Workshop", Workshop);
app.use("/AlumniActivities", AlumniActivities);
app.use("/OutreachActivities", OutreachActivities);

// Default route
app.get("/", (req, res) => {
  res.render("home", { page: { pageTitle: "HomePage" } });
});
app.get("/visitors", (req, res) => {
  res.render("visitors", { page: { pageTitle: "Visitors" } });
});
app.get("/students/sap", (req, res) => {
  res.render("students/sap");
});

app.get("/students/placement-highlights", (req, res) => {
  res.render("students/placementHighlights", {
    page: { pageTitle: "Placement Highlights" }  
  });
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
