// controllers/faculty/ConsultancyWork.js
import ConsultancyWork from "../../models/faculty/ConsultancyWork.js";

// Fetch all consultancy works
export const getAllConsultancyWorks = async (req, res) => {
  try {
    // Fetch all consultancy works from DB
    const consultancies = await ConsultancyWork.find().sort({ createdAt: -1 });

    // Pass the array to EJS
    res.render("faculty/ConsultancyWork", { consultancies });
  } catch (error) {
    console.error("Error fetching consultancy work:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new consultancy work (CRUD - Create)
export const addConsultancyWork = async (req, res) => {
  try {
    const newWork = new ConsultancyWork(req.body);
    await newWork.save();
    res.redirect("/consultancy");
  } catch (error) {
    console.error("Error adding consultancy work:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
