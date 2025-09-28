import mongoose from "mongoose";

const facultyUpskillingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    default: "Assistant Professor",
  },
  department: {
    type: String,
    default: "NWC, SRMIST",
  },
  achievements: [
    {
      title: { type: String },        // e.g., "NPTEL DISCIPLINE STAR"
      description: { type: String },  // detailed description (certificates, awards, etc.)
      organization: { type: String }, // e.g., NPTEL, WIPRO, MSME Govt of India
      date: { type: Date },           // exact date if available
      monthYear: { type: String },    // alternative for "April 2025"
    },
  ],
  image: {
    type: String, // store image path or URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FacultyUpskilling = mongoose.model(
  "FacultyUpskilling",
  facultyUpskillingSchema
);

export default FacultyUpskilling;
