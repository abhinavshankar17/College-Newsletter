import OutreachActivityModel from "../../models/events/OutReach.js";

export const getOutreachActivity = async (req, res) => {
  try {
    const activities = await OutreachActivityModel.find(); // fetch all
    res.render("events/OutreachActivity.ejs", { activities });
  } catch (error) {
    console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

export const addOutreachActivity = async (req, res) => {
  try {
    const newActivity = new OutreachActivityModel(req.body);
    await newActivity.save();
    res.redirect("/OutreachActivity");
  } catch (error) {
    console.error("Error adding OutreachActivity:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
