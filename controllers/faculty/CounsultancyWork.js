// controllers/faculty/CounsultancyWork.js
import ConsultancyWork from "../../models/faculty/ConsultancyWork.js";

export const getAllConsultancyWorks = async (req, res) => {
  try {
    // For now, pick the first consultancy (later you can fetch by ID)
    const consultancy = await ConsultancyWork.findOne();

    res.render("faculty/ConsultancyWork", {
      consultancy,
    });
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

