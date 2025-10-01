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

// Add new faculty article
export const addArticle = async (req, res) => {
  try {
    const {
      title,
      authorName,
      authorDesignation,
      content,
      images,     // Can be single string or array of strings
      quotesText
    } = req.body;

    console.log("Incoming Data:", req.body);

    // Ensure images is always an array of strings
    let safeImages = [];
    if (Array.isArray(images)) {
      safeImages = images.map(img => img.trim()).filter(Boolean);
    } else if (typeof images === "string" && images.trim() !== "") {
      safeImages = [images.trim()];
    }

    const newArticleData = {
      title: title?.trim() || undefined,
      author: authorName
        ? {
            name: authorName.trim(),
            designation: authorDesignation?.trim() || undefined
          }
        : undefined,
      content: content?.trim() || undefined,
      images: safeImages,
      quotes: quotesText && quotesText.trim() !== "" ? { text: quotesText.trim() } : undefined
    };

    console.log("Prepared Article Data:", newArticleData);

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
