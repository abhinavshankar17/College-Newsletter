import mongoose from "mongoose";

const phdScholarSchema = new mongoose.Schema({
  images: { type: [String], default: [] },

  name: { type: String, required: true },

  regNo: { type: String, required: false },

  description: { type: String, required: false },

  mode: { type: String, required: false },   // NEW

  supervisor: { type: String, required: false }, // NEW

  completionDate: { type: Date, required: false }, // NEW

  createdAt: { type: Date, default: Date.now }
});

// Static method
phdScholarSchema.statics.getPhdScholars = async function () {
  try {
    const scholars = await this.find().lean();
    return scholars;
  } catch (error) {
    console.error("Error fetching PhD scholars:", error);
    throw error;
  }
};

const PhdScholar = mongoose.model(
  "PhdScholar",
  phdScholarSchema,
  "phdScholars"
);

export default PhdScholar;