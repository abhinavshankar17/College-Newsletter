import CelebrationModel from "../../models/events/CelebrationModel.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const Events = await CelebrationModel.find().lean(); // returns array of events
    res.render("events/Celebration.ejs", { Events });
  } catch (error) {
    console.error("Error fetching Events:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new event
export const addAllEvents = async (req, res) => {
  try {
    const {
      eventTitle,
      description,
      numberOfParticipants,
      eventSummary,
      images
    } = req.body;

    const newEvent = new CelebrationModel({
      eventTitle: eventTitle || "Untitled Event",
      description: description || "",
      numberOfParticipants: numberOfParticipants || 0,
      eventSummary: eventSummary || "",
      images: images || []
    });

    await newEvent.save();
    res.redirect("/Celebration");
  } catch (error) {
    console.error("Error adding Event:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
