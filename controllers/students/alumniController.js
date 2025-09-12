import AlumniArticle from "../../models/students/AlumniArticle.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// GET - display alumni articles
export const getAlumniArticles = async (req, res) => {
  try {
    const articles = await AlumniArticle.find().sort({ createdAt: -1 });
    res.render("alumni/articles", { articles });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching alumni articles");
  }
};

// POST - create new alumni article
export const createAlumniArticle = async (req, res) => {
  try {
    let alumniImage = "";

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "alumni_articles",
        });
        alumniImage = result.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
      } finally {
        try {
          await fs.promises.unlink(req.file.path);
        } catch (unlinkErr) {
          console.warn("Failed to delete temp file:", unlinkErr.message);
        }
      }
    }

    const { heading, name, rollNumber, yearOfPassing, department, currentPosition, description } =
      req.body;

    if (!heading || !name || !rollNumber || !yearOfPassing || !department || !description) {
      return res.status(400).send("Missing required fields");
    }

    await AlumniArticle.create({
      heading,
      alumni: {
        name,
        rollNumber,
        yearOfPassing,
        department,
        currentPosition,
      },
      alumniImage,
      description,
    });

    res.redirect("/students/articles");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating alumni article");
  }
};
