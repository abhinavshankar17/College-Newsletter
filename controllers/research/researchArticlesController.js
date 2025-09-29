import ResearchArticles from "../../models/research/ResearchArticles.js";

export const getResearchArticles = async (req, res) => {
  try {
    const page = await ResearchArticles.findOne().lean();

    if (!page) {
      return res.render("research/ResearchArticles", {
        page: { pageTitle: "Research Articles", sections: [] }
      });
    }

    // Group projects by headline for each section
    const sections = (page.sections || []).map(sec => {
      const grouped = {};
      (sec.projects || []).forEach(p => {
        if (!grouped[p.headline]) grouped[p.headline] = [];
        grouped[p.headline].push(p);
      });

      return {
        ...sec,
        projectsGrouped: grouped
      };
    });

    res.render("research/ResearchArticles", {
      page: {
        pageTitle: page.pageTitle,
        sections
      }
    });
  } catch (err) {
    console.error("Error in getResearchArticles:", err);
    res.status(500).send("Error loading research articles");
  }
};

// Add article from dynamic admin form
export const createResearchArticle = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).send("No data received");
    }

    // Extract fields dynamically
    const sectionTitle = data.sectionTitle || "Default Section";
    const headline = data.headline || "Untitled";
    const authors = data.authors
      ? Array.isArray(data.authors)
        ? data.authors.filter(a => a.trim())
        : data.authors.split(",").map(a => a.trim())
      : [];
    const journal = data.journal || "";
    const issn = data.issn || "";
    const description = data.description || "";

    // Find or create the single page document
    let page = await ResearchArticles.findOne();
    if (!page) {
      page = new ResearchArticles({ pageTitle: "Research Articles", sections: [] });
    }

    // Find the section by title or create new
    let section = page.sections.find(s => s.title === sectionTitle);
    if (!section) {
      section = { title: sectionTitle, order: page.sections.length + 1, projects: [] };
      page.sections.push(section);
    }

    // Add the new article
    section.projects.push({ headline, authors, journal, issn, description });

    await page.save();

    res.redirect("/admin/add-article"); // redirect back to admin form
  } catch (err) {
    console.error("Error saving research article:", err);
    res.status(500).send("Error saving research article");
  }
};
