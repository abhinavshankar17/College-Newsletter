import OutReachActivities from "../../models/events/OutReach.js";

 
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
      resourcePerson,
      convenorAndConvenor,
      eventSummary,
      images,
    } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: "Title and Date are required",
      });
    }

    const newActivity = await OutReachActivities.create({
      title,
      date,
      time: time || "",

      // Convert to array if not array
      venue: Array.isArray(venue) ? venue : venue ? [venue] : [],

      participants: Array.isArray(participants)
        ? participants
        : participants
        ? [participants]
        : [],

      Association: Association || "",

      // Must be array based on model
      resourcePerson: Array.isArray(resourcePerson)
        ? resourcePerson
        : resourcePerson
        ? [resourcePerson]
        : [],

      convenorAndConvenor: Array.isArray(convenorAndConvenor)
        ? convenorAndConvenor
        : convenorAndConvenor
        ? [convenorAndConvenor]
        : [],

      eventSummary: eventSummary || "",

      images: Array.isArray(images) ? images : images ? [images] : [],
    });

    return res.status(201).json({
      success: true,
      message: "Outreach Activity Added Successfully",
      data: newActivity,
    });
  } catch (error) {
    console.error("Error adding Outreach Activity:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
