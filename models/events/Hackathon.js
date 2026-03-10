import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({

  title: {
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

export default mongoose.model("Hackathon", hackathonSchema);