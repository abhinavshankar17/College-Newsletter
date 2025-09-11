import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, // Cloudinary URL
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);
