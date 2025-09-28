import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  headline: { type: String, required: false },
  inventors: { type: [String], required: false },
  status: { type: String, required: false },
  issuingAgency: { type: String, required: false },
  overview: { type: String, required: false },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: false },
  order: { type: Number, required: false },
  themeColor: { type: String, required: false },
  projects: { type: [projectSchema], required: false },
});

const researchProjectsPageSchema = new mongoose.Schema({
  pageTitle: { type: String, default: "Research Projects" },
  sections: { type: [sectionSchema], default: [] },
  updatedAt: { type: Date, default: Date.now },
});

// 🔑 Static method for controller
researchProjectsPageSchema.statics.getAllSections = async function () {
  try {
    return await this.find().sort({ order: 1 }).lean();
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};

// 👇 Explicitly tell mongoose to use research_sections collection
const ResearchProjects = mongoose.model(
  "ResearchProjects",
  sectionSchema,
  "research_sections"
);

export default ResearchProjects;
