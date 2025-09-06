import ResearchOration from "../../models/research/ResearchOration.js";

// Show all orations
export const getAllOrations = async (req, res) => {
  try {
    const orations = await ResearchOration.find().sort({ date: -1 }).lean();

    res.render("research/researchOrations", {
  page: {
    pageTitle: "Research Orations",
    sections: orations
  }
});

  } catch (err) {
    console.error("Error in getAllOrations:", err);
    res.status(500).send("Error loading research orations");
  }
};

// Add new oration
export const createOration = async (req, res) => {
  try {
    const { name, regNo, supervisor, title, date, description } = req.body;

    const newOration = new ResearchOration({
      name,
      regNo,
      supervisor,
      title,
      date: new Date(date), // ensure correct type
      description,
      imageUrl: req.file ? req.file.path : null, // Cloudinary URL
    });

    await newOration.save();

    res.redirect("/research-orations");
  } catch (err) {
    console.error("Error in createOration:", err);
    res.status(500).send("Failed to save research oration");
  }
};
