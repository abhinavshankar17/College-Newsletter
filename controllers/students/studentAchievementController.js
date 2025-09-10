import StudentAchievement from "../../models/students/StudentAchievement.js";

// List all achievements
export const getAchievements = async (req, res) => {
  try {
    const achievements = await StudentAchievement.find();
    res.render("students/achievements", { achievements });
  } catch (err) {
    res.status(500).send("Error fetching achievements");
  }
};

// Create a new achievement
export const createAchievement = async (req, res) => {
  try {
    const newAchievement = new StudentAchievement(req.body);
    await newAchievement.save();
    res.redirect("/students/achievements");
  } catch (err) {
    res.status(500).send("Error creating achievement");
  }
};
