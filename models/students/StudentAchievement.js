import mongoose from "mongoose";

const studentAchievementSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  imageUrl: { type: [String], default: [] } // Ensure images is an array
});

export default mongoose.model("StudentAchievement", studentAchievementSchema);
