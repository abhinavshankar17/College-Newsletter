import mongoose from "mongoose";

// 🎯 Each research article
const articleSchema = new mongoose.Schema({
  headline: { type: String, required: false },         // 🟢 Article title
  authors: { type: [String], required: false },        // Authors list
  journal: { type: String, required: false },          // Journal name
  issn: { type: String, required: false },             // ISSN number
  description: { type: String, required: false },      // Description paragraph
});

// 🎯 Section = Red Heading (Healthcare and Medical AI, etc.)
const sectionSchema = new mongoose.Schema({
  title: { type: String, required: false },            // 🔴 Section heading
  order: { type: Number, required: false },            // For sorting
  themeColor: { type: String, required: false },       // Accent color
  projects: { type: [articleSchema], required: false } // Articles under section
});

// 🎯 Page container schema
const researchArticlesPageSchema = new mongoose.Schema({
  pageTitle: { type: String, default: "Research Articles" },
  sections: { type: [sectionSchema], default: [] },
  updatedAt: { type: Date, default: Date.now },
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
