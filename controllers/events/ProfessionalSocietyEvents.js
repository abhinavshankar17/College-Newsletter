import ProfessionalSocietyEvent from "../../models/events/ProfessionalSocietyEvent.js";

export const getProfessionalSocietyEvents = async (req, res) => {
  try {
    const events = await ProfessionalSocietyEvent.find().sort({ _id: 1 });

    res.render("events/professionalsocietyevents", { events });
  } catch (error) {
    console.error(error);
    res.send("Error loading Professional Society Events");
  }
};