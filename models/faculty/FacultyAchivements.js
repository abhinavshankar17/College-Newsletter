import mongoose from "mongoose";

const facultyAchievementSchema = new mongoose.Schema({
  // Faculty details
 faculty1:{
  name: { type: String, required: false},
  designamtion: { type: String, required: false},
  images: { type: [String], default: [] },
  description: { type: String, required: false },


 },
 faculty2:{
name: { type: String, required: false},
  designamtion: { type: String, required: false},
  images: { type: [String], default: [] },
  description: { type: String, required: false },
 },
  faculty3:{
name: { type: String, required: false},
  designamtion: { type: String, required: false},
  images: { type: [String], default: [] },
  description: { type: String, required: false },
 },
  faculty4:{
name: { type: String, required: false},
  designamtion: { type: String, required: false},
  images: { type: [String], default: [] },
  description: { type: String, required: false },
 },
  faculty5:{
name: { type: String, required: false},
  designamtion: { type: String, required: false},
  images: { type: [String], default: [] },
  description: { type: String, required: false },
 },
  faculty6:{
name: { type: String, required: false},
  designamtion: { type: String, required: false},
  images: { type: [String], default: [] },
  description: { type: String, required: false },
 },
});

export default mongoose.model("FacultyAchievement", facultyAchievementSchema);
