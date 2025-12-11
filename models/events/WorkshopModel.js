import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    title: { type: String, required: false, trim: true },

    date: { type: String, required: false, trim: true },  // e.g., "07.07.2025 to 11.07.2025"
    time: { type: String, trim: true },                  // "9:30 AM to 4:00 PM"
    venue: { type: String, trim: true },

    conveners: { type: [String], default: [] },          // multiple names
    coConveners: { type: [String], default: [] },        
    resourcePersons: { type: [String], default: [] },

    numberOfParticipants: { type: Number, default: 0 },

    eventSummary: { type: String, trim: true },

    images: { type: [String], default: [] }
  },
  { timestamps: true }
);

// 🔥 Group workshops by DATE (first date in range)
workshopSchema.statics.getGroupedWorkshops = async function () {
  try {
    const workshops = await this.find().sort({ createdAt: -1 }).lean();

    if (!workshops.length) return {};

    const grouped = workshops.reduce((acc, workshop) => {
      let key = workshop.date.split("to")[0].trim(); // take first date
      if (!acc[key]) acc[key] = [];
      acc[key].push(workshop);
      return acc;
    }, {});

    return grouped;

  } catch (err) {
    console.error("Grouping workshops failed:", err);
    throw err;
  }
};

const Workshop = mongoose.model("Workshop", workshopSchema, "_workshop");

export default Workshop;
