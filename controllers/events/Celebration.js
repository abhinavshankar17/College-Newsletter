import CelebrationModel from "../../models/events/CelebrationModel.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const Events = await CelebrationModel.find().lean(); // returns an array
    res.render("events/Celebration.ejs", { Events });
  } catch (error) {
    console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new event
export const addAllEvents = async (req, res) => {
  try {
    const newEvents = new CelebrationModel(req.body);
    await newEvents.save();
    res.redirect("/Celebration");
  } catch (error) {
    console.error("Error adding Events:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
