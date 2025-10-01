import CyberSecurity from "../../models/specialization/cyberSecurity.js";

// Show Cyber Security Page
export const getCyberSecurity = async (req, res) => {
  try {
    const raw = await CyberSecurity.findOne().lean();
    if (!raw) {
      return res.render("specialization/cyberSecurity", { page: null });
    }

    const page = {
      specializationName: raw.specializationName,
      specializationDescription: raw.specializationDescription,
      academicExcellence: raw.academicExcellence || {},
      internshipsIndustryExposure: raw.internshipsIndustryExposure || {},
      facultyDevelopmentCertifications: raw.facultyDevelopmentCertifications || {},
      outreachRecognitionEngagement: raw.outreachRecognitionEngagement || {},
      internationalCollaborations: raw.internationalCollaborations || { images: [] },
      quote: raw.quote || "",
    };

    res.render("specialization/cyberSecurity", { page });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Cyber Security data");
  }
};

// Add Cyber Security Data
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
