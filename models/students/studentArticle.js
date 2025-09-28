import mongoose from "mongoose";

const studentArticleSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  author: {
    name: { type: String, required: false },
    rollNumber: { type: String, required: false },
    year: { type: String, required: false },
    section: { type: String, required: false },
    department: { type: String, required: false }
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
