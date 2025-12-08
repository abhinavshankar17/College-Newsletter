import OutReachActivities from "../../models/events/OutReach.js";

// 📄 Get all activities grouped by date
export const getOutreachActivity = async (req, res) => {
  try {
    const groupedActivities = await OutReachActivities.getGroupedActivities();
    res.render("events/OutreachActivity.ejs", {
      activities: groupedActivities,
    });
  } catch (error) {
    console.error("Error fetching Outreach Activities:", error);
    res.status(500).send("Server Error");
  }
};

// 📄 Add a new activity
export const addOutreachActivity = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      venue,
      participants,
      Association,
      resourcePerson,            // ✅ renamed
      convenorAndConvenor,
      eventSummary,
      images,
    } = req.body;

    if (!title || !date) {
      return res.status(400).send("Title and Date are required");
    }

    const newActivity = await OutReachActivities.create({
      title,
      date,
      time: time || "",
      venue: Array.isArray(venue) ? venue : venue ? [venue] : [],
      participants: Array.isArray(participants)
        ? participants
        : participants
        ? [participants]
        : [],
      Association: Association || "",
      resourcePerson: resourcePerson || "",   // ✅ saved correctly
      convenorAndConvenor: convenorAndConvenor || "",
      eventSummary: eventSummary || "",
      images: Array.isArray(images) ? images : images ? [images] : [],
    });

    res.status(201).json({
      success: true,
      data: newActivity,
    });
  } catch (error) {
    console.error("Error adding Outreach Activity:", error);
    res.status(500).send("Server Error");
  }
};
