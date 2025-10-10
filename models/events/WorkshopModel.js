import mongoose from "mongoose";

// 🎯 Workshop schema
const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },        // 🔴 Grouping by date
  Convener: { type: String, required: false },  
  ResourcePerson: { type: String, required: false },
  NumberofRegisteredParticipants: { type: String, required: false },
  EventSummary: { type: String, required: false },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// 🔑 Static method for grouping workshops by date
workshopSchema.statics.getGroupedWorkshops = async function () {
  try {
    const workshops = await this.find().lean();
    if (!workshops || workshops.length === 0) return {};

    const grouped = workshops.reduce((groups, workshop) => {
      const key = workshop.date;
      if (!groups[key]) groups[key] = [];
      groups[key].push(workshop);
      return groups;
    }, {});

    return grouped;
  } catch (error) {
    console.error("Error grouping workshops:", error);
    throw error;
  }
};

const Workshop = mongoose.model("Workshop", workshopSchema, "_workshop");

export default Workshop;
