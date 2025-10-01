import WorkshopModel from "../../models/events/WorkshopModel.js";

// Get all workshops
export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await WorkshopModel.find().lean(); // fetch all
    res.render("events/Workshops.ejs", { workshops });
  } catch (error) {
    console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new workshop
export const addAllWorkshops = async (req, res) => {
  try {
   const { title, description, eventSummary, images } = req.body;
const newWorkshop = new WorkshopModel({ title, description, eventSummary, images });
await newWorkshop.save();

    res.redirect("/Workshops");
  } catch (error) {
    console.error("Error adding Workshop:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
