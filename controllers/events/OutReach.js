import OutReachActivities from "../../models/events/OutReach.js";

// 📄 Get all activities grouped by date
export const getOutreachActivity = async (req, res) => {
  try {
    const groupedActivities = await OutReachActivities.getGroupedActivities();
    
    // Render EJS page
    res.render("events/OutreachActivity.ejs", { activities: groupedActivities });
  } catch (error) {
    console.error("Error fetching Outreach Activities:", error);
    res.status(500).send("Server Error");
  }
};

// 📄 Add a new activity
export const addOutreachActivity = async (req, res) => {
  try {
    const { title, date, time, venue, participants, CoOrdinators, EventSummary, images } = req.body;

    if (!title || !date) {
      return res.status(400).send("Title and Date are required");
    }

    const newActivity = await OutReachActivities.create({
      title,
      date,
      time,
      venue: venue || [],
      participants,
      CoOrdinators,
      EventSummary,
      images: images || [],
    });

    res.status(201).json({ success: true, data: newActivity });
  } catch (error) {
    console.error("Error adding Outreach Activity:", error);
    res.status(500).send("Server Error");
  }
};
