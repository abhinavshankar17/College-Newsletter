import mongoose from "mongoose";

const ConsultancyWorkSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description1: { type: String, required: false },
    consultancyCompany: { type: String, required: false },
  consultancyAmount: { type: Number, required: false },
  Member1:{
     name: { type: String, required: false },
      designation: { type: String },
      department: { type: String, default: "NWC, SRMIST" },
      images: { type: [String], default: [] },
  },
   Member2:{
     name: { type: String, required: false },
      designation: { type: String },
      department: { type: String, default: "NWC, SRMIST" },
      images: { type: [String], default: [] },
  },
   Member3:{
     name: { type: String, required: false },
      designation: { type: String },
      department: { type: String, default: "NWC, SRMIST" },
      images: { type: [String], default: [] },
  },
  closingQuote: {
    type: String,
    default:
      "Innovation thrives where expertise meets opportunity – consultancy bridges the path from ideas to impactful solutions.",
  },


});

const ConsultancyWork = mongoose.model("ConsultancyWork", ConsultancyWorkSchema);
export default ConsultancyWork;
