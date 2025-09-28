// models/phdScholar.js
import mongoose from "mongoose";

const phdScholarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  regNo: {
    type: String,
    required: false,
    unique: true,
  },
  scholarType: {
    type: String, // full-time, part-time internal, part-time external
    required: false,
  },
  guide: {
    type: String,
    required: false,
  },
  vivaDate: {
    type: Date,
    required: false,
  },
  researchTitle: {
    type: String,
    required: false,
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
