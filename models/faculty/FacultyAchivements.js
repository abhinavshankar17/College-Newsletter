import mongoose from "mongoose";

const facultyAchievementSchema = new mongoose.Schema({
  // Faculty details
  facultyName: { type: String, required: true },
  designation: { type: String, required: true }, // e.g., Professor, Associate Professor
  department: { type: String, required: true },  // e.g., NWC
  institution: { type: String, default: "SRMIST" },
  photoUrl: { type: String }, // faculty profile photo

  // Achievement details
  achievementType: {
    type: String,
    enum: ["Project", "Paper", "Internship", "Award", "SessionChair", "Other"],
    required: true
  },
  title: { type: String },          // e.g., "LoRaWAN Enabled Smart Landslide Early Detection"
  description: { type: String },    // full description of the achievement
  collaborators: [
    {
      name: String,
      role: String,                 // e.g., Student, Co-Faculty
      regNo: String                 // for students (optional)
    }
  ],
  organization: { type: String },   // e.g., SRM Institute, University of Rwanda
  event: { type: String },          // e.g., "ICCCC 2025", "Project Expo NWC’25"
  role: { type: String },           // e.g., "Session Chair"
  recognition: { type: String },    // e.g., "Best Paper Award", "Certificate of Appreciation"

  // Dates (flexible for internship/project/paper/event)
  startDate: { type: Date },
  endDate: { type: Date },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FacultyAchievement", facultyAchievementSchema);
