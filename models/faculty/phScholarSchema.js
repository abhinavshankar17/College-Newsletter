import mongoose from "mongoose";

const phdScholarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: false },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

// Static method to fetch all scholars
phdScholarSchema.statics.getPhdScholars = async function () {
  try {
    const scholars = await this.find().lean();
    return scholars;
  } catch (error) {
    console.error("Error fetching PhD scholars:", error);
    throw error;
  }
};

// Model & Collection
const PhdScholar = mongoose.model(
  "PhdScholar",
  phdScholarSchema,
  "phdScholars" // separate collection
);

export default PhdScholar;
