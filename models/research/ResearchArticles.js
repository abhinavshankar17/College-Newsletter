import mongoose from "mongoose";

// 🎯 Each research article
const articleSchema = new mongoose.Schema({
  headline: String,         // 🟢 Article title
  authors: [String],        // Authors list
  journal: String,          // Journal name
  issn: String,             // ISSN number
  description: String       // Description paragraph
});

// 🎯 Section = Red Heading (Healthcare and Medical AI, etc.)
const sectionSchema = new mongoose.Schema({
  title: String,            // 🔴 Section heading
  order: Number,            // For sorting
  themeColor: String,       // Accent color
  projects: [articleSchema] // Articles under section
});

// 🎯 Page container schema
const researchArticlesPageSchema = new mongoose.Schema({
  pageTitle: { type: String, default: "Research Articles" },
  sections: { type: [sectionSchema], default: [] },
  updatedAt: { type: Date, default: Date.now }
});

// 🔑 Static method for fetching all sections
researchArticlesPageSchema.statics.getAllSections = async function () {
  try {
    return await this.find().sort({ order: 1 }).lean();
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }
};

// 👇 Explicit collection name
const ResearchArticles = mongoose.model(
  "ResearchArticles",
  researchArticlesPageSchema,
  "research_articles"
);

export default ResearchArticles;
