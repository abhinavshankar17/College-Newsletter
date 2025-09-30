import mongoose from "mongoose";

// 🎯 Each research article schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },        // 🔴 Title for grouping articles
  headline: { type: String, required: false },    // 🟢 Article headline
  authors: { type: [String], required: false },   // Authors list
  journal: { type: String, required: false },     // Journal name
  issn: { type: String, required: false },        // ISSN number
  description: { type: String, required: false }, // Description paragraph
  createdAt: { type: Date, default: Date.now },   // Timestamp for article creation
});

// 🔑 Static method for grouping articles by title
articleSchema.statics.getGroupedArticles = async function () {
  try {
    const articles = await this.find().lean();
    if (!articles || articles.length === 0) return {};

    // Group articles by title
    const groupedArticles = articles.reduce((groups, article) => {
      if (!groups[article.title]) {
        groups[article.title] = [];
      }
      groups[article.title].push(article);
      return groups;
    }, {});

    return groupedArticles;
  } catch (error) {
    console.error("Error grouping articles:", error);
    throw error;
  }
};

// 👇 Explicit collection name
const ResearchArticles = mongoose.model(
  "ResearchArticles",
  articleSchema,
  "research_articles"
);

export default ResearchArticles;
