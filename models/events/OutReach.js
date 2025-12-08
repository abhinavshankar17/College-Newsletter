import mongoose from "mongoose";

// OutReach article schema
const OutReachSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String },

    venue: { type: [String], default: [] },
    participants: { type: [String], default: [] },

    Association: { type: String, default: "" },

    resourcePerson: { type: String, default: "" }, // ✅ renamed
    convenorAndConvenor: { type: String, default: "" },

    eventSummary: { type: String, default: "" },
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
