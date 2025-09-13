import mongoose from "mongoose";

const alumniArticleSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    name: { type: String, required: true },
    batch: { type: String, required: true },
    department: { type: String, required: true }
  },
  alumniImage: {
    type: String, // Cloudinary URL
    default: ""
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Prevent OverwriteModelError
const AlumniArticle =
  mongoose.models.AlumniArticle || mongoose.model("AlumniArticle", alumniArticleSchema);

export default AlumniArticle;
