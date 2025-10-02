import WorkshopModel from "../../models/events/WorkshopModel.js";

// Get workshops (only one doc with workshop1 & workshop2)
export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await WorkshopModel.findOne().lean(); 
    res.render("events/Workshops.ejs", { workshops });
  } catch (error) {
    console.log("❌ Error fetching workshops:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add/update workshops (update workshop1 or workshop2)
export const addAllWorkshops = async (req, res) => {
  try {
    const { workshopKey, title, description, eventSummary, images } = req.body;

    // ensure one document exists
    let workshops = await WorkshopModel.findOne();
    if (!workshops) workshops = new WorkshopModel();

    // assign values dynamically (workshop1 or workshop2)
    workshops[workshopKey] = { title, description, eventSummary, images };

    await workshops.save();
    res.redirect("/Workshops");
  } catch (error) {
    console.error("❌ Error adding Workshop:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
