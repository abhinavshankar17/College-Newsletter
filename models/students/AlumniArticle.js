import mongoose from "mongoose";

const alumniArticleSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    alumni: {
      name: { type: String, required: true },
      rollNumber: { type: String, required: true },
      yearOfPassing: { type: String, required: true },
      department: { type: String, required: true },
      currentPosition: { type: String, required: false },
    },
    alumniImage: {
      type: String, // Cloudinary image URL
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AlumniArticle = mongoose.model("AlumniArticle", alumniArticleSchema);

export default AlumniArticle;
