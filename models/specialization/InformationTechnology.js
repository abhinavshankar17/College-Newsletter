import mongoose from "mongoose";

const informationTechnologySchema = new mongoose.Schema({
  title: String,
  description: String,
  DoctotalCommitteeMeeting: String,
  phdAwardees: String, // just a string
  images: { type: [String], default: [] }, // top-level images array
  researchPublications: String,
  Workshops: String,
  quote: String,
});

export default mongoose.model("informationTechnology", informationTechnologySchema );