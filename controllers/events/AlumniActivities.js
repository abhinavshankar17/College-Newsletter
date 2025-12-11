import AlumniActivityModel from "../../models/events/AlumniActivities.js";

// 📄 Get all alumni activities
export const getAllAlumniActivities = async (req, res) => {
  try {
    const activities = await AlumniActivityModel.find().lean();
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

    const newActivity = new AlumniActivityModel({
      title: title || "",
      Date: Date || "",
      Time: Time || "",
      Venue: Venue || "",
      Participants: Participants || "",

      // ⭐ Convert to array if single value
      ResoursePerson: Array.isArray(ResoursePerson)
        ? ResoursePerson
        : ResoursePerson
        ? [ResoursePerson]
        : [],

      convener: Array.isArray(convener)
        ? convener
        : convener
        ? [convener]
        : [],

      eventsummary: eventsummary || "",
      eventoutcome: eventoutcome || "",

      images: Array.isArray(images) ? images : images ? [images] : [],
    });

    await newActivity.save();
    res.redirect("/AlumniActivities");
  } catch (error) {
    console.error("Error adding Alumni Activity:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
