import mongoose from "mongoose";

// 🎯 Each OutReach article schema
const OutReachSchema = new mongoose.Schema({
   title: { type: String, required: true },
  date: { type: String, required: true },        // 🔴 Title for grouping Activities
  time: { type: String, required: false },    // 🟢 Article headline
  venue: { type: [String], required: false },   // Authors list
  participants: { type: String, required: false },     // Journal name
  CoOrdinators: { type: String, required: false },        // ISSN number
  EventSummary: { type: String, required: false },
    images: { type: [String], default: [] } ,
   // Description paragraph
  createdAt: { type: Date, default: Date.now }, 
    // Timestamp for article creation
});

// 🔑 Static method for grouping Activities by title
OutReachSchema.statics.getGroupedActivities = async function () {
  try {
    const activities = await this.find().lean();
    if (!activities || activities.length === 0) return {};

    // Group Activities by date
    const groupedActivities = activities.reduce((groups, article) => {
      const key = article.date; // grouping by date
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(article);
      return groups;
    }, {});

    return groupedActivities;
  } catch (error) {
    console.error("Error grouping Activities:", error);
    throw error;
  }
};


// 👇 Explicit collection name
const OutReachActivities = mongoose.model(
  "OutReachActivities",
  OutReachSchema,
  "OutReach_Activities"
);

export default OutReachActivities;
