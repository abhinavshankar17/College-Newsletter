import mongoose from "mongoose";
const facultyUpskillingSchema = new mongoose.Schema({
  images: { type: [String], default: [] },
  name: { type: String, required: true },
  designation: { type: String, default: "Assistant Professor" }, // add default
  department: { type: String, default: "NWC, SRMIST" },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

facultyUpskillingSchema.statics.getFacultyUpskilling = async function () {
  try {
    const fac = await this.find().lean();
    if (!fac || fac.length === 0) return {};

    const grouped = fac.reduce((groups, f) => {
      const key = f.designation || "Others";
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
const FacultyUpskilling = mongoose.model(
  "FacultyUpskilling",
  facultyUpskillingSchema,
  "facultyUpskilling" // separate collection from OnBoard
);

export default FacultyUpskilling;
