import ResearchProjects from "../../models/research/ResearchProjects.js";

export const getResearchProjects = async (req, res) => {
  try {
    const sections = await ResearchProjects.find().sort({ order: 1 }).lean();


    res.render("research/ResearchProjects", {
      page: {
        pageTitle: "Research Projects",
        sections: sections
      }
    });
  } catch (err) {
    console.error("Error in getResearchProjects:", err);
    res.status(500).send("Error loading research projects");
  }
};
