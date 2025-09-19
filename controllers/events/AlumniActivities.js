import AlumniModel from "../../models/events/AlumniActivities.js";

// Get all alumni activities
export const getAllAlumniActivities = async (req, res) => {
  try {
    const AlumniActivities = await AlumniModel.find().lean(); // fetch all records as array
    res.render("events/AlumniActivities.ejs", { AlumniActivities });
  } catch (error) {
    console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new alumni activity
export const addAllAlumniActivities = async (req, res) => {
  try {
    const AlumniActivity = new AlumniModel(req.body);
    await AlumniActivity.save();
    res.redirect("/AlumniActivities");
  } catch (error) {
    console.error("Error adding AlumniActivity:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
