import Workshop from "../../models/events/WorkshopModel.js";

// 📄 Get workshops grouped by date
export const getAllWorkshops = async (req, res) => {
  try {
    const groupedWorkshops = await Workshop.getGroupedWorkshops();
    res.render("events/workshops.ejs", { workshops: groupedWorkshops });
  } catch (error) {
    console.error("Error fetching workshops:", error);
    res.status(500).send("Server Error");
  }
};

// 📄 Add a new workshop
export const addAllWorkshops = async (req, res) => {
  try {
    const { title, date, Convener, ResourcePerson, NumberofRegisteredParticipants, EventSummary, images } = req.body;

    if (!title || !date) return res.status(400).send("Title and Date are required");

    const newWorkshop = await Workshop.create({
      title,
      date,
      Convener,
      ResourcePerson,
      NumberofRegisteredParticipants,
      EventSummary,
      images: images || [],
    });

    res.status(201).json({ success: true, data: newWorkshop });
  } catch (error) {
    console.error("Error adding workshop:", error);
    res.status(500).send("Server Error");
  }
};
