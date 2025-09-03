import mongoose from "mongoose";

const researchOrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  supervisor: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },   // Cloudinary URL (optional)
});

const ResearchOration = mongoose.model("ResearchOration", researchOrationSchema);
export default ResearchOration;
