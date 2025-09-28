import mongoose from "mongoose";

const alumniArticleSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: false,
    trim: true
  },
  author: {
    name: { type: String, required: false },
    batch: { type: String, required: false },
    department: { type: String, required: false }
  },
  alumniImage: {
    type: String, // Cloudinary URL
    default: ""
  },
  description: {
    type: String,
    required: false,
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
