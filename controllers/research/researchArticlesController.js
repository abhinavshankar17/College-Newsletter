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
    const headline = data.headline || null; // Null if no headline is provided
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

    if (headline) {
      // Find the headline group within the section or create new
      let headlineGroup = section.projects.find(p => p.headline === headline);
      if (!headlineGroup) {
        headlineGroup = { headline, authors: [], journal: "", issn: "", description: "" };
        section.projects.push(headlineGroup);
      }

      // Add the new article details to the headline group
      headlineGroup.authors = [...new Set([...headlineGroup.authors, ...authors])]; // Merge authors
      headlineGroup.journal = journal || headlineGroup.journal; // Update journal if provided
      headlineGroup.issn = issn || headlineGroup.issn; // Update ISSN if provided
      headlineGroup.description = description || headlineGroup.description; // Update description if provided
    } else {
      // Add articles without a headline at the bottom
      section.projects.push({
        headline: "Uncategorized", // Default headline for articles without a headline
        authors,
        journal,
        issn,
        description,
      });
    }

    await page.save();

    res.redirect("/admin/add-article"); // redirect back to admin form
  } catch (err) {
    console.error("Error saving research article:", err);
    res.status(500).send("Error saving research article");
  }
};
