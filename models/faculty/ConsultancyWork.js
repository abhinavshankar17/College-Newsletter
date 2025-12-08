import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: false },
  designation: { type: String, required: false },
  department: { type: String, default: "NWC, SRMIST" },
  images: { type: [String], default: [] } // multiple images per member
});

const consultancySchema = new mongoose.Schema({
  title: { type: String, required: false },
  description1: { type: String, required: false },
  consultancyCompany: { type: String, required: false },
  consultancyAmount: { type: String, required: false },
  Member: memberSchema, // nested member object
  createdAt: { type: Date, default: Date.now } // timestamp
});

// Optional: static method to get all consultancies grouped or sorted if needed
consultancySchema.statics.getAllConsultancies = async function () {
  try {
    const consultancies = await this.find().lean();
    return consultancies;
  } catch (error) {
    console.error("Error fetching consultancies:", error);
    throw error;
  }
};

// Model
const Consultancy = mongoose.model("Consultancy", consultancySchema, "consultancies");

export default Consultancy;
