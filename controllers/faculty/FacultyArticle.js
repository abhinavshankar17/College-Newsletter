import FacultyArticle from "../../models/faculty/FacultyArticle.js";

// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await FacultyArticle.find();
    res.render("faculty/FacultyArticle", { articles });
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};



export const addArticle = async (req, res) => {
  try {
    const {
      // Article 1
      title1,
      authorName1,
      authorDesignation1,
      images1,       // single string or array
      content1,
      quotesText1,
      // Article 2
      title2,
      authorName2,
      authorDesignation2,
      images2,       // single string or array
      content2,
      quotesText2
    } = req.body;

    // Helper function to normalize images
    const normalizeImages = (images) => {
      if (!images) return [];
      if (Array.isArray(images)) return images.map(img => img.trim()).filter(Boolean);
      if (typeof images === "string" && images.trim() !== "") return [images.trim()];
      return [];
    };

    // Prepare first article
    const article1 = {
      title1: title1?.trim() || undefined,
      author1: authorName1
        ? {
            name: authorName1.trim(),
            designation: authorDesignation1?.trim() || undefined,
            images: normalizeImages(images1)
          }
        : undefined,
      content1: content1?.trim() || undefined,
      quotes1: quotesText1?.trim() ? { text: quotesText1.trim() } : undefined
    };

    // Prepare second article
    const article2 = {
      title2: title2?.trim() || undefined,
      author2: authorName2
        ? {
            name: authorName2.trim(),
            designation: authorDesignation2?.trim() || undefined,
            images: normalizeImages(images2)
          }
        : undefined,
      content2: content2?.trim() || undefined,
      quotes2: quotesText2?.trim() ? { text: quotesText2.trim() } : undefined
    };

    // Merge articles into one object
    const newArticleData = { ...article1, ...article2 };

    const newArticle = new FacultyArticle(newArticleData);
    await newArticle.save();

    console.log("✅ Article saved successfully:", newArticle._id);
    res.redirect("/FacultyArticle");
  } catch (error) {
    console.error("❌ Error saving article:", error);

    if (error.name === "ValidationError") {
      return res.status(400).render("error", { message: "Validation Error: " + error.message });
    }

    res.status(500).render("error", { message: "Server Error" });
  }
};
