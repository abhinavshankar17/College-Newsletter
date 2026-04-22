import Workshop from "../../models/events/WorkshopModel.js"; 
export const getAllWorkshops = async (req, res) => {
  try {
    const groupedWorkshops = await Workshop.getGroupedWorkshops();
    res.render("events/Workshops", { workshops: groupedWorkshops });
  } catch (err) {
    console.error("Error fetching workshops:", err);
    res.status(500).send("Server Error");
  }
};
 
export const addWorkshops = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      venue,
      conveners,
      coConveners,
      resourcePersons,
      numberOfParticipants,
      eventSummary,
      images
    } = req.body;

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: "Title and Date are required"
      });
    }

    const workshop = await Workshop.create({
      title,
      date,
      time,
      venue,

      conveners: Array.isArray(conveners)
        ? conveners
        : conveners?.split("\n") || [],

      coConveners: Array.isArray(coConveners)
        ? coConveners
        : coConveners?.split("\n") || [],

      resourcePersons: Array.isArray(resourcePersons)
        ? resourcePersons
        : resourcePersons?.split("\n") || [],

      numberOfParticipants: Number(numberOfParticipants || 0),

      eventSummary,

      images: Array.isArray(images)
        ? images
        : images?.split("\n") || []
    });

    res.status(201).json({ success: true, data: workshop });

  } catch (err) {
    console.error("Error adding workshop:", err);
    res.status(500).send("Server Error");
  }
};
