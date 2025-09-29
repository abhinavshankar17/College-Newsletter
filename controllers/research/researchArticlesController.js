import ResearchArticles from "../../models/research/ResearchArticles.js";

// Fetch and render research articles grouped by headline
export const getResearchArticles = async (req, res) => {
  try {
    const sections = await ResearchArticles.find().sort({ order: 1 }).lean();

    // ✅ Flatten all projects across sections
    let allProjects = [];
    sections.forEach(wrapper => {
      (wrapper.sections || []).forEach(sec => {
        (sec.projects || []).forEach(proj => {
          allProjects.push({
            ...proj,
            sectionTitle: sec.title,
            themeColor: sec.themeColor
          });
        });
      });
    });

    // ✅ Group projects by headline
    const groupedProjects = {};
    allProjects.forEach(p => {
      if (!groupedProjects[p.headline]) groupedProjects[p.headline] = [];
      groupedProjects[p.headline].push(p);
    });

    // Render page with grouped projects
    res.render("research/ResearchArticles", {
      page: {
        pageTitle: "Research Articles",
        groupedProjects
      }
    });
  } catch (err) {
    console.error("Error in getResearchArticles:", err);
    res.status(500).send("Error loading research articles");
  }
};

// Optional: Create a new research article
export const createResearchArticle = async (req, res) => {
  try {
    const { headline, authors, journal, issn, description, sectionName } = req.body;

    // Find or create section wrapper
    let sectionWrapper = await ResearchArticles.findOne({ sectionName });
    if (!sectionWrapper) {
      sectionWrapper = new ResearchArticles({
        pageTitle: "Research Articles",
        sections: [{ title: sectionName, projects: [] }]
      });
    }

    // Find or create section inside wrapper
    let section = sectionWrapper.sections.find(s => s.title === sectionName);
    if (!section) {
      section = { title: sectionName, projects: [] };
      sectionWrapper.sections.push(section);
    }

    // Push new project
    section.projects.push({ headline, authors, journal, issn, description });

    await sectionWrapper.save();
    res.redirect("/research-articles");
  } catch (err) {
    console.error("Error in createResearchArticle:", err);
    res.status(500).send("Error saving research article");
  }
};
