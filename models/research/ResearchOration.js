import mongoose from "mongoose";

const researchOrationSchema = new mongoose.Schema({
  name: { type: String, required: false },
  regNo: { type: String, required: false },
  supervisor: { type: String, required: false },
  title: { type: String, required: false },
  date: { type: Date, required: false },
  description: { type: String, required: false },
  imageUrl: { type: String },   // Cloudinary URL (optional)
});

const ResearchOration = mongoose.model("ResearchOration", researchOrationSchema);
export default ResearchOration;
