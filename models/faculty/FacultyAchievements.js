import mongoose from "mongoose";

const facultyAchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },           // Group title (was 'name')
  designation: { type: String, required: false },    // Faculty designation
  images: { type: [String], default: [] },           // Image URLs or filenames
  description: { type: String, required: false },    // Description of achievement
});

// 🔑 Static method for grouping faculty achievements by title
facultyAchievementSchema.statics.getGroupedFacultyAchievements = async function () {
  try {
    const achievements = await this.find().lean();
    if (!achievements || achievements.length === 0) return {};

    // Group by 'title'
    const grouped = achievements.reduce((groups, item) => {
      if (!groups[item.title]) {
        groups[item.title] = [];
      }
      groups[item.title].push(item);
      return groups;
    }, {});

    return grouped;
  } catch (error) {
    console.error("Error grouping faculty achievements:", error);
    throw error;
  }
};

// 👇 Explicit collection name
const FacultyAchievement = mongoose.model(
  "FacultyAchievement",
  facultyAchievementSchema,
  "facultyAchievement"
);

export default FacultyAchievement;
