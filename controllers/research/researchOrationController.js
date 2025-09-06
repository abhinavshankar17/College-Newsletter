import ResearchOration from "../models/ResearchOration.js";

// Show all orations + form
export const getAllOrations = async (req, res) => {
  try {
    const orations = await ResearchOration.find().sort({ date: -1 });
    res.render("research/researchOrations", { orations });
  } catch (err) {
    console.error("❌ Error fetching orations:", err);
    res.status(500).send("Error fetching research orations");
  }
};

// Add new oration
export const createOration = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.imageUrl = req.file.path; // Cloudinary URL
    }

    const oration = new ResearchOration(data);
    await oration.save();

    res.redirect("/research-orations");
  } catch (err) {
    console.error("❌ Error saving oration:", err);
    res.status(500).send("Failed to save research oration");
  }
};
