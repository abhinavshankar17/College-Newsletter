import FacultyAchievements from "../../models/faculty/FacultyAchivements.js";

// Show Page
export const getFacultyAchievements = async (req, res) => {
  try {
    // Fetch one achievement from DB (or null if none exists)
    const achievement = await FacultyAchievements.findOne();

    // Render the EJS page, passing either the achievement or null
    res.render("faculty/FacultyAchievements", { achievement });
  } catch (error) {
    console.error("Error fetching Faculty Achievements:", error);
    res.status(500).send("Error fetching Faculty Achievements data");
  }
};

// Add new document (CRUD - Create)
export const addFacultyAchievements = async (req, res) => {
  try {
    const newData = new FacultyAchievements(req.body);
    await newData.save();
    res.redirect("/faculty/achievements"); // Redirect to show updated data
  } catch (error) {
    console.error("Error adding Faculty Achievements:", error);
    res.status(500).send("Error adding Faculty Achievements data");
  }
};
