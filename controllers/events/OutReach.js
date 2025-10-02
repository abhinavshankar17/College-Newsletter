import OutreachActivityModel from "../../models/events/OutReach.js";

// Get all outreach activities
export const getOutreachActivity = async (req, res) => {
  try {
    const activities = await OutreachActivityModel.find();
    res.render("events/OutreachActivity.ejs", { activities });
  } catch (error) {
    console.error("Error fetching Outreach Activities:", error);
    res.status(500).send("Server Error: " + error.message);
  }
};

// Add new outreach activity
export const addOutreachActivity = async (req, res) => {
  try {
    const { activityKey, title, date, time, venue, participants, coordinators, eventSummary, images } = req.body;

    // Ensure activityKey is either 'Activity1' or 'Activity2'
    if (!['Activity1', 'Activity2'].includes(activityKey)) {
      return res.status(400).send("Invalid activity key. Must be 'Activity1' or 'Activity2'.");
    }

    // Parse coordinators string into object
    const parsedCoordinators = coordinators ? { name: coordinators } : null;

    // Create activity object
    const activityData = {
      title,
      date,
      time,
      venue,
      participants,
      coordinators: parsedCoordinators,
      eventSummary,
      images: Array.isArray(images) ? images : images ? [images] : []
    };

    // Check if there is already a document
    let existingDoc = await OutreachActivityModel.findOne();
    if (existingDoc) {
      // Update the specified activity key
      existingDoc[activityKey] = activityData;
      await existingDoc.save();
    } else {
      // Create new document with the activity under the given key
      const newDoc = new OutreachActivityModel({
        [activityKey]: activityData
      });
      await newDoc.save();
    }

    res.redirect("/OutreachActivity");
  } catch (error) {
    console.error("Error adding OutreachActivity:", error);
    res.status(500).send("Server Error: " + error.message);
  }
};
