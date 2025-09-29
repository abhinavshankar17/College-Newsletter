import mongoose from "mongoose";

// Each project
const projectSchema = new mongoose.Schema({
  headline: { type: String, required: false },
  inventors: { type: [String], required: false }, // multiple inventors
  status: { type: String, required: false },
  issuingAgency: { type: String, required: false },
  overview: { type: String, required: false },
});

// Each section (category like IoT, Healthcare)
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: false },
  order: { type: Number, required: false },
  themeColor: { type: String, required: false },
  projects: { type: [projectSchema], default: [] },
});

// Entire page
const researchProjectsPageSchema = new mongoose.Schema({
  pageTitle: { type: String, default: "Research Projects" },
  sections: { type: [sectionSchema], default: [] },
  updatedAt: { type: Date, default: Date.now },
});

// Static method to get sections sorted by order
researchProjectsPageSchema.statics.getAllSections = async function () {
  try {
    const page = await this.findOne().lean();
    if (!page) return [];
    return page.sections.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};

// ✅ Export the correct model
const ResearchProjects = mongoose.model(
  "ResearchProjectsPage",       // Model name
  researchProjectsPageSchema,   // Full page schema
  "research_projects_pages"     // Collection name in MongoDB
);

export default ResearchProjects;
