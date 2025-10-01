import OutreachActivityModel from "../../models/events/OutReach.js";

export const getOutreachActivity = async (req, res) => {
  try {
    const activities = await OutreachActivityModel.find();
    res.render("events/OutreachActivity.ejs", { activities });
  } catch (error) {
    console.error("The error occurred is:", error);
    res.status(500).send("Server Error: " + error.message);
  }
};

export const addOutreachActivity = async (req, res) => {
  try {
    const { title, date, time, venue, participants, coordinators, eventSummary, images } = req.body;

    // If coordinators is just a string from form, save as object
    const parsedCoordinators = coordinators ? { name: coordinators } : null;

    const newActivity = new OutreachActivityModel({
      title,
      date, // save as string
      time,
      venue,
      participants,
      coordinators: parsedCoordinators,
      eventSummary,
      images: Array.isArray(images) ? images : images ? [images] : []
    });

    await newActivity.save();
    res.redirect("/OutreachActivity");
  } catch (error) {
    console.error("Error adding OutreachActivity:", error);
    res.status(500).send("Server Error: " + error.message);
  }
};


