import mongoose from "mongoose";

const researchProjectSchema = new mongoose.Schema({
  title: { type: String, required: false },           // Section grouping
  headline: { type: String, required: false },        // Project headline
  inventors: { type: [String], default: [] },         // Multiple inventors
  status: { type: String, required: false },
  issuingAgency: { type: String, required: false },
  description: { type: String, required: false },
  patentno: { type: String, required: false },
  year: { type: Date, default: Date.now }
});

const ResearchProject = mongoose.model(
  "ResearchProject",
  researchProjectSchema,
  "research_projects"
);

export default ResearchProject;
