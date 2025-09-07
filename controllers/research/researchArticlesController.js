import ResearchArticles from "../../models/research/ResearchArticles.js";

export const getResearchArticles = async (req, res) => {
  try {
    const sections = await ResearchArticles.find().sort({ order: 1 }).lean();

    res.render("research/ResearchArticles", {
      page: {
        pageTitle: "Research Articles",
        sections: sections
      }
    });
  } catch (err) {
    console.error("Error in getResearchArticles:", err);
    res.status(500).send("Error loading research articles");
  }
};
