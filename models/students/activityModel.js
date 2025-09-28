import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  rollNumber: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: { type: [String], default: [] } // Ensure images is an array
}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);
