import FacultyArticle from "../../models/faculty/FacultyArticle.js";

// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await FacultyArticle.find();
    res.render("faculty/FacultyArticle", { articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new article
export const addArticle = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); // Debug

    const newFacultyArticle = new FacultyArticle(req.body);
    await newFacultyArticle.save();

    res.redirect("/Faculty-Article");
  } catch (error) {
    console.error("Error adding faculty article:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
