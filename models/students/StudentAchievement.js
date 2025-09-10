import mongoose from "mongoose";

const studentAchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },       // the red line
  description: { type: String, required: true }  // full description text
}, { timestamps: true });

const StudentAchievement = mongoose.model("StudentAchievement", studentAchievementSchema);

export default StudentAchievement;
