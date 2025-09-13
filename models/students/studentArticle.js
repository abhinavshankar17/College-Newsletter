import mongoose from "mongoose";

const studentArticleSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    year: { type: String, required: true },
    section: { type: String, required: true },
    department: { type: String, required: true }
  },
  studentImage: {
    type: String, // Cloudinary URL
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Prevent OverwriteModelError
const StudentArticle =
  mongoose.models.StudentArticle || mongoose.model("StudentArticle", studentArticleSchema);

export default StudentArticle;
