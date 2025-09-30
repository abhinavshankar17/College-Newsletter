import ResearchProject from "../../models/research/ResearchProjects.js";

// 📖 Get all projects grouped by title
export const getResearchProjects = async (req, res) => {
  try {
    const projects = await ResearchProject.find().lean();

    // group projects by title
    const sections = {};
    projects.forEach(p => {
      const group = p.title || "Untitled";
      if (!sections[group]) sections[group] = [];
      sections[group].push(p);
    });

    res.render("research/ResearchProjects", {
      page: {
        pageTitle: "Research Projects",
        sections
      }
    });
  } catch (err) {
    console.error("Error in getResearchProjects:", err);
    res.status(500).send("Error loading research projects");
  }
};

// ➕ Add project (if you’re using the dynamic form POST)
export const addResearchProject = async (req, res) => {
  try {
    let { data } = req.body;

    // normalize inventors: split comma string → array
    if (data?.inventors && typeof data.inventors === "string") {
      data.inventors = data.inventors
        .split(",")
        .map(i => i.trim())
        .filter(Boolean);
    }

    const newProj = new ResearchProject(data);
    await newProj.save();

    res.status(201).json({ message: "Project added successfully", newProj });
  } catch (err) {
    console.error("Error adding research project:", err);
    res.status(500).json({ message: "Failed to add project" });
  }
};
