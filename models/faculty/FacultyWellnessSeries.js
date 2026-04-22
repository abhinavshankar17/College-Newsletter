import mongoose from "mongoose";

const facultyWellnessSchema = new mongoose.Schema({

  title: {
    type: String,
    required: false 
  },

  description: {
    type: String,
    required: true
  },

  images: [{
    type: String
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export default mongoose.model("FacultyWellnessSeries", facultyWellnessSchema);
