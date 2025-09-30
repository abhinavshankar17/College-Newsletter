import ResearchArticles from "../../models/research/ResearchArticles.js";

// 📄 Get all research articles (grouped by title)
export const getResearchArticles = async (req, res) => {
  try {
    const groupedArticles = await ResearchArticles.getGroupedArticles();

    res.render("research/ResearchArticles", {
      groupedArticles
    });
  } catch (err) {
    console.error("Error in getResearchArticles:", err);
    res.status(500).send("Error loading research articles");
  }
};

// ➕ Add a new article
export const createResearchArticle = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).send("No data received");
    }

    // Parse authors safely
    const authors = data.authors
      ? Array.isArray(data.authors)
        ? data.authors.filter(a => a.trim())
        : data.authors.split(",").map(a => a.trim())
      : [];

    // Create new article doc
    const newArticle = new ResearchArticles({
      title: data.title || "Uncategorized",
      headline: data.headline || "",
      authors,
      journal: data.journal || "",
      issn: data.issn || "",
      description: data.description || ""
    });

    await newArticle.save();

    res.redirect("/admin/add-article"); // back to admin form
  } catch (err) {
    console.error("Error saving research article:", err);
    res.status(500).send("Error saving research article");
  }
};
