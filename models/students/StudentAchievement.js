import mongoose from "mongoose";

const studentAchievementSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  imageUrl: { type: String }  // ✅ New field
});

export default mongoose.model("StudentAchievement", studentAchievementSchema);
