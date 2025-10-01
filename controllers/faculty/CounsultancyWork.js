// controllers/faculty/ConsultancyWork.js
import ConsultancyWork from "../../models/faculty/ConsultancyWork.js";

// Fetch all consultancy works
export const getAllConsultancyWorks = async (req, res) => {
  try {
    // Fetch all consultancy works from DB, sorted by newest first
    const consultancies = await ConsultancyWork.find().sort({ createdAt: -1 });

    // Render EJS with fetched data
    res.render("faculty/ConsultancyWork", { consultancies });
  } catch (error) {
    console.error("Error fetching consultancy work:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new consultancy work
export const addConsultancyWork = async (req, res) => {
  try {
    // Prepare members with images as arrays, even if single image uploaded
    const members = ["Member1", "Member2", "Member3"].reduce((acc, key) => {
      if (req.body[key]) {
        acc[key] = {
          name: req.body[key].name || "",
          designation: req.body[key].designation || "",
          department: req.body[key].department || "NWC, SRMIST",
          images: req.body[key].images
            ? Array.isArray(req.body[key].images)
              ? req.body[key].images
              : [req.body[key].images] // wrap single image as array
            : [],
        };
      }
      return acc;
    }, {});

    // Create new consultancy work
    const newWork = new ConsultancyWork({
      title: req.body.title || "",
      description1: req.body.description1 || "",
      consultancyCompany: req.body.consultancyCompany || "",
      consultancyAmount: req.body.consultancyAmount || 0,
      closingQuote:
        req.body.closingQuote ||
        "Innovation thrives where expertise meets opportunity – consultancy bridges the path from ideas to impactful solutions.",
      ...members,
    });

    await newWork.save();
    res.redirect("/consultancy");
  } catch (error) {
    console.error("Error adding consultancy work:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
