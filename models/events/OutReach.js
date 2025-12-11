import mongoose from "mongoose";

// Outreach Activity Schema
const OutReachSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, default: "", trim: true },

    venue: { type: [String], default: [] },
    participants: { type: [String], default: [] },

    Association: { type: String, default: "", trim: true },

    resourcePerson: { type: [String], default: [] },   // ✔ Resource Persons
    convenor: { type: [String], default: [] },         // ✔ Convenor list
    coconvenor: { type: [String], default: [] },       // ✔ Co-Convenor list

    eventSummary: { type: String, default: "", trim: true },

    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Group activities by date
OutReachSchema.statics.getGroupedActivities = async function () {
  try {
    const activities = await this.find().lean();

    return activities.reduce((acc, activity) => {
      acc[activity.date] = acc[activity.date] || [];
      acc[activity.date].push(activity);
      return acc;
    }, {});
  } catch (err) {
    console.error("Error grouping Activities:", err);
    throw err;
  }
};

// Model
const OutReachActivities = mongoose.model(
  "OutReachActivities",
  OutReachSchema,
  "OutReach_Activities"
);

export default OutReachActivities;
