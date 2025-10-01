import FacultyAchievements from "../../models/faculty/FacultyAchivements.js";

// Show all achievements page
export const getFacultyAchievements = async (req, res) => {
  try {
    const achievements = await FacultyAchievements.find();
    res.render("faculty/FacultyAchievements", { achievements });
  } catch (error) {
    console.error("❌ Error fetching Faculty Achievements:", error);
    res.status(500).send("Error fetching Faculty Achievements data");
  }
};

// Add new Faculty Achievement document
export const addFacultyAchievements = async (req, res) => {
  try {
    const { body, files } = req;

    const achievementData = {};

    for (let i = 1; i <= 6; i++) {
      const nameKey = `name${i}`;
      const desigKey = `designamtion${i}`; // matches schema typo
      const descKey = `description${i}`;
      const imageKey = `image${i}`; // field name for multer

      const facultyMember = {};

      // Add name, designation, description if provided
      if (body[nameKey] && body[nameKey].trim() !== "") facultyMember.name = body[nameKey].trim();
      if (body[desigKey] && body[desigKey].trim() !== "") facultyMember.designamtion = body[desigKey].trim();
      if (body[descKey] && body[descKey].trim() !== "") facultyMember.description = body[descKey].trim();

      // Add image if uploaded
      facultyMember.images = [];
      if (files && files.length > 0) {
        const relevantFile = files.find(f => f.fieldname === imageKey);
        if (relevantFile) facultyMember.images.push(relevantFile.path || relevantFile.filename);
      }

      // Only add if at least one property exists
      if (
        facultyMember.name || 
        facultyMember.designamtion || 
        facultyMember.description || 
        facultyMember.images.length > 0
      ) {
        achievementData[`faculty${i}`] = facultyMember;
      }
    }

    const newAchievement = new FacultyAchievements(achievementData);
    await newAchievement.save();

    console.log("✅ Faculty Achievement added:", newAchievement._id);
    res.redirect("/faculty/achievements");
  } catch (error) {
    console.error("❌ Error adding Faculty Achievement:", error);
    res.status(500).send("Error adding Faculty Achievements data");
  }
};
