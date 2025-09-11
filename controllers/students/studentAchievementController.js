import StudentAchievement from "../../models/students/StudentAchievement.js";
import { v2 as cloudinary } from "cloudinary";

export const getAchievements = async (req, res) => {
  try {
    const achievements = await StudentAchievement.find();
    res.render("students/achievements", { achievements });
  } catch (err) {
    res.status(500).send("Error fetching achievements");
  }
};

export const createAchievement = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "student_achievements"
      });
      imageUrl = result.secure_url;
    }

    await StudentAchievement.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl
    });

    res.redirect("/students/achievements");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating achievement");
  }
};
