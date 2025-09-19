import CyberSecurity from "../../models/specialization/cyberSecurity.js";

// Show page
export const getCyberSecurity = async (req, res) => {
  try {
    const raw = await CyberSecurity.findOne().lean();
    if (!raw) {
      return res.render("specialization/cyberSecurity", { page: null });
    }

    const page = {
      title: raw.title || "Cyber Security",
      introduction: raw.introduction || "",
      academicExcellence: {
        description: raw.academicExcellence?.description || "",
        facultyHighlights: raw.academicExcellence?.facultyHighlights || [],
        publications: raw.academicExcellence?.publications || [],
      },
      internships: raw.internships || [],
      certifications: raw.certifications || [],
      outreach: {
        programs: raw.outreach?.programs || [],
        events: raw.outreach?.events || [],
      },
      collaborations: raw.collaborations || [],
      quote: raw.quote || "",
      images: raw.images || [],
    };

    res.render("specialization/cyberSecurity", { page });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Cyber Security data");
  }
};

// Add new document
export const addCyberSecurity = async (req, res) => {
  try {
    const doc = new CyberSecurity(req.body);
    await doc.save();
    res.redirect("/specialization/cyber-security");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Cyber Security data");
  }
};
