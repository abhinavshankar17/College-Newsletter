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
    const newWorkshop = new WorkshopModel(req.body);
    await newWorkshop.save();
    res.redirect("/Workshops");
  } catch (error) {
    console.error("Error adding Workshop:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
