import FacultyArticle from "../../models/faculty/FacultyArticle.js";


// GET all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await FacultyArticle.find().lean();
    res.render("faculty/FacultyArticle", { articles });
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// POST add new article
export const addArticle = async (req, res) => {
  try {
    const { title, name, designation, description, quote } = req.body;

    // Handle uploaded images
    const images = req.files
      ? req.files.map((file) => "/uploads/" + file.filename)
      : [];

    const newArticle = new FacultyArticle({
      title: title?.trim(),
      name: name?.trim(),
      designation: designation?.trim(),
      description: description?.trim(),
      quote: quote?.trim(),
      images,
    });

    await newArticle.save();

    console.log("✅ Article saved successfully:", newArticle._id);
    res.redirect("/faculty/articles");
  } catch (error) {
    console.error("❌ Error saving article:", error);

    if (error.name === "ValidationError") {
      return res.status(400).render("error", { message: "Validation Error: " + error.message });
    }

    res.status(500).render("error", { message: "Server Error" });
  }
};
