import AlumniModel from "../../models/events/AlumniActivities.js";

// Get all alumni activities
export const getAllAlumniActivities = async (req, res) => {
  try {
    const activities = await AlumniModel.find().lean();
    res.render("events/AlumniActivities.ejs", { activities });
  } catch (error) {
    console.error("Error fetching Alumni Activities:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new alumni activity
export const addAllAlumniActivities = async (req, res) => {
  try {
    let {
      eventTitle,
      participantsCount,
      participantsBatchRange,
      convenername,
      convenerdesignation,
      convenerdepartment,
      eventOutcomes,
      images
    } = req.body;

    const newAlumniActivity = new AlumniModel({
      eventTitle,
      participantsCount,
      participantsBatchRange,
      convenername,
      convenerdesignation,
      convenerdepartment,
      eventOutcomes,
      images: images || []
    });

    await newAlumniActivity.save();
    res.redirect("/AlumniActivities");
  } catch (error) {
    console.error("Error adding AlumniActivity:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
