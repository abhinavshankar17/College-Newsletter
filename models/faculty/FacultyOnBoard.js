import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  images: { type: [String], default: [] },
  name: { type: String, required: true },
  designation: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Static method to group faculty by designation
facultySchema.statics.getFacultyGroupedByDesignation = async function () {
  try {
    const facultyList = await this.find().lean();
    if (!facultyList || facultyList.length === 0) return {};

    const grouped = facultyList.reduce((groups, f) => {
      const key = f.designation || "Others"; // default group
      if (!groups[key]) groups[key] = [];
      groups[key].push(f);
      return groups;
    }, {});

    return grouped;
  } catch (error) {
    console.error("Error grouping faculty:", error);
    throw error;
  }
};

// ✅ Explicit collection name (optional)
const FacultyOnBoard = mongoose.model("FacultyOnBoard", facultySchema, "faculty_on_board");

export default FacultyOnBoard;
