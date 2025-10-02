import CyberSecurity from "../../models/specialization/cyberSecurity.js";

// Helper function to ensure nested fields exist and images are arrays
const normalizeNestedField = (field) => {
  if (!field) return { description: "", images: [] };
  return {
    description: field.description || "",
    images: Array.isArray(field.images) ? field.images : (field.images ? [field.images] : []),
  };
};

// Show Cyber Security Page
export const getCyberSecurity = async (req, res) => {
  try {
    const raw = await CyberSecurity.findOne().lean();
    if (!raw) {
      return res.render("specialization/cyberSecurity", { page: null });
    }

    // Normalize nested fields
    const page = {
      title: raw.title || "",
      description: raw.description || "",
      AcademicExcellenceAndResearchOutput: raw.AcademicExcellenceAndResearchOutput || "",
      InternshiptAndIndustryExposure: normalizeNestedField(raw.InternshiptAndIndustryExposure),
      FacultyDevelopmentAndCertifications: raw.FacultyDevelopmentAndCertifications || "",
      OutreachRecognitionAndEngagement: raw.OutreachRecognitionAndEngagement || "",
      InternationalCollaboration: normalizeNestedField(raw.InternationalCollaboration),
      quote: raw.quote || "",
    };

    res.render("specialization/cyberSecurity", { page });
  } catch (err) {
    console.error("Error fetching Cyber Security data:", err);
    res.status(500).send("Error fetching Cyber Security data");
  }
};

// Add or Update Cyber Security Data
export const addCyberSecurity = async (req, res) => {
  try {
    const payload = {
      title: req.body.title || "",
      description: req.body.description || "",
      AcademicExcellenceAndResearchOutput: req.body.AcademicExcellenceAndResearchOutput || "",
      InternshiptAndIndustryExposure: {
        description: req.body.InternshiptAndIndustryExposure?.description || "",
        images: Array.isArray(req.body.InternshiptAndIndustryExposure?.images)
          ? req.body.InternshiptAndIndustryExposure.images
          : (req.body.InternshiptAndIndustryExposure?.images ? [req.body.InternshiptAndIndustryExposure.images] : []),
      },
      FacultyDevelopmentAndCertifications: req.body.FacultyDevelopmentAndCertifications || "",
      OutreachRecognitionAndEngagement: req.body.OutreachRecognitionAndEngagement || "",
      InternationalCollaboration: {
        description: req.body.InternationalCollaboration?.description || "",
        images: Array.isArray(req.body.InternationalCollaboration?.images)
          ? req.body.InternationalCollaboration.images
          : (req.body.InternationalCollaboration?.images ? [req.body.InternationalCollaboration.images] : []),
      },
      quote: req.body.quote || "",
    };

    // If a document already exists, update it; otherwise, create a new one
    const existing = await CyberSecurity.findOne();
    if (existing) {
      await CyberSecurity.updateOne({ _id: existing._id }, payload);
    } else {
      const doc = new CyberSecurity(payload);
      await doc.save();
    }

    res.redirect("/specialization/cyber-security");
  } catch (err) {
    console.error("Error adding/updating Cyber Security data:", err);
    res.status(500).send("Error adding/updating Cyber Security data");
  }
};
