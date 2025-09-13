import AlumniArticle from "../../models/students/AlumniArticle.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// 📌 Get all alumni articles
export const getAlumniArticles = async (req, res) => {
  try {
    const alumniArticles = await AlumniArticle.find().sort({ createdAt: -1 });
    // If alumniArticles.ejs is inside views/students/
    res.render("students/alumniArticles", { alumniArticles });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching alumni articles");
  }
};

// 📌 Create a new alumni article
export const createAlumniArticle = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "alumni_articles"
      });
      imageUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path); // delete local file
    }

    const newArticle = new AlumniArticle({
      heading: req.body.heading,
      author: {
        name: req.body.name,
        batch: req.body.batch,
        department: req.body.department
      },
      alumniImage: imageUrl,
      description: req.body.description
    });

    await newArticle.save();
    res.redirect("/students/alumniArticles");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating alumni article");
  }
};
