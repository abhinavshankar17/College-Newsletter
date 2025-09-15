import StudentArticle from "../../models/students/StudentArticle.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// GET - display articles
export const getArticles = async (req, res) => {
  try {
    const articles = await StudentArticle.find().sort({ createdAt: -1 });
    res.render("students/articles", { articles });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching articles");
  }
};

// POST - create new article (multer saves file to disk at req.file.path)
export const createArticle = async (req, res) => {
  try {
    let studentImage = "";

    if (req.file) {
      try {
        // Upload file on disk to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "student_articles"
        });
        studentImage = result.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        // you may want to show a message to user instead of proceeding
      } finally {
        // ALWAYS remove the local temp file (avoid disk buildup)
        try {
          await fs.promises.unlink(req.file.path);
        } catch (unlinkErr) {
          console.warn("Failed to delete temp file:", unlinkErr.message);
        }
      }
    }

    // Validate required fields
    const { heading, name, rollNumber, year, section, department } = req.body;
    if (!heading || !name || !rollNumber || !year || !section || !department) {
      return res.status(400).send("Missing required fields");
    }

    await StudentArticle.create({
      heading,
      author: {
        name,
        rollNumber,
        year,
        section,
        department
      },
      studentImage
    });

    res.redirect("/students/articles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating article");
  }
};
