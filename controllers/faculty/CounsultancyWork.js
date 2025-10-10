import Consultancy from "../../models/faculty/ConsultancyWork.js";

// Get all consultancies
export const  getAllConsultancyWorks = async (req, res) => {
  try {
    const consultancies = await Consultancy.find().lean();
    res.render("faculty/ConsultancyWork", { consultancies });
  } catch (error) {
    console.error("Error fetching consultancies:", error);
    res.status(500).send("Server Error");
  }
};

// Add a consultancy
export const addConsultancyWork  = async (req, res) => {
  try {
    const { title, description, consultancyCompany, consultancyAmount, Members } = req.body;

    const newConsultancy = await Consultancy.create({
      title,
      description,
      consultancyCompany,
      consultancyAmount,
      Members,
    });

    res.status(201).json({ success: true, data: newConsultancy });
  } catch (error) {
    console.error("Error adding consultancy:", error);
    res.status(500).send("Server Error");
  }
};
