import FacultyAchievement from "../../models/faculty/FacultyAchievements.js";


// ✅ GET — Show all grouped faculty achievements
export const getFacultyAchievements = async (req, res) => {
  try {
    const groupedAchievements = await FacultyAchievement.getGroupedFacultyAchievements();
    res.render("faculty/facultyAchievements.ejs", { groupedAchievements });
  } catch (error) {
    console.error("Error fetching faculty achievements:", error);
    res.status(500).send("Error fetching faculty achievements");
  }
};

// ✅ POST — Add a new faculty achievement
export const addFacultyAchievements = async (req, res) => {
  try {
    const { title, designation, description } = req.body;
    let images = [];

    // Handle file uploads (if images uploaded via multer)
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const newAchievement = new FacultyAchievement({
      title,
      designation,
      description,
      images,
    });

    await newAchievement.save();
    console.log("✅ Faculty achievement added successfully:", newAchievement);

    res.redirect("/admin/faculty-achievements");
  } catch (error) {
    console.error("Error adding faculty achievement:", error);
    res.status(500).send("Error saving faculty achievement");
  }
};
