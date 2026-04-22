 import mongoose from "mongoose";

const lectureSeriesSchema = new mongoose.Schema({

  heading: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  images: [
    {
      type: String
    }
  ]

}, { timestamps: true });

export default mongoose.model("LectureSeries", lectureSeriesSchema);