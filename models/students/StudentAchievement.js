import mongoose from "mongoose";

const studentAchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }  // ✅ New field
});

export default mongoose.model("StudentAchievement", studentAchievementSchema);
