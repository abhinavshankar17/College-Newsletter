// models/phdScholar.js
import mongoose from "mongoose";

const phdScholarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  scholarType: {
    type: String, // full-time, part-time internal, part-time external
    required: true,
  },
  guide: {
    type: String,
    required: true,
  },
  vivaDate: {
    type: Date,
    required: true,
  },
  researchTitle: {
    type: String,
    required: true,
  },
  researchDomain: {
    type: String, // e.g., Blockchain, Machine Learning, NLP
    required: false,
  },
  techniquesUsed: {
    type: [String], // array of techniques/methods used
    required: false,
  },
});

const PhdScholar = mongoose.model("PhdScholar", phdScholarSchema);

export default PhdScholar;
