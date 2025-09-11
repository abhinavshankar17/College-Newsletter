import Activity from "../../models/students/activityModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Get all activities (renders EJS)
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.render("students/activities", { activities }); // <-- renders EJS
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// ✅ Create new activity
export const createActivity = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "student_activities",
      });
      imageUrl = uploadResult.secure_url;

      // remove local file after upload
      fs.unlinkSync(req.file.path);
    }

    const { name, rollNumber, description } = req.body;

    const newActivity = new Activity({
      name,
      rollNumber,
      description,
      imageUrl,
    });

    await newActivity.save();
    res.redirect("/students/activities"); // after adding, go back to the list
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
