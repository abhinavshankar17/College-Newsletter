import AlumniModel from "../../models/events/AlumniActivities.js";

// 📄 Get all alumni activities
export const getAllAlumniActivities = async (req, res) => {
  try {
    const activities = await AlumniModel.find().lean();
    res.render("events/AlumniActivities.ejs", { activities });
  } catch (error) {
    console.error("Error fetching Alumni Activities:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// 📄 Add new alumni activity
export const addAllAlumniActivities = async (req, res) => {
  try {
    const {
      title,
      Date,
      Time,
      Venue,
      Participants,
      ResoursePerson,
      convener,
      eventsummary,
      eventoutcome,
      images,
    } = req.body;

    const newAlumniActivity = new AlumniModel({
      title: title || "",
      Date: Date || "",
      Time: Time ? Number(Time) : undefined,
      Venue: Venue || "",
      Participants: Participants || "",
      ResoursePerson: ResoursePerson || "",
      convener: convener || "",
      eventsummary: eventsummary || "",
      eventoutcome: eventoutcome || "",
      images: Array.isArray(images) ? images : images ? [images] : [],
    });

    await newAlumniActivity.save();
    res.redirect("/AlumniActivities");
  } catch (error) {
    console.error("Error adding Alumni Activity:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
