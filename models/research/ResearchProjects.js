import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  headline: String,
  inventors: [String],
  status: String,
  issuingAgency: String,
  overview: String,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  order: Number,
  themeColor: String,
  projects: [projectSchema],
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
