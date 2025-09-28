import mongoose from "mongoose";

const ConsultancyWorkSchema = new mongoose.Schema({
  title: { type: String, required: false },
  collaboratingAgency: { type: String, required: false },
  consultancyAmount: { type: Number, required: false },
  department: { type: String, default: "Networking and Communications" },
  duration: {
    start: { type: Date },
    end: { type: Date },
  },
  projectDescription: { type: String, required: false },
  teamMembers: [
    {
      name: { type: String, required: false },
      designation: { type: String },
      department: { type: String, default: "NWC, SRMIST" },
      imageUrl: { type: [String], default: [] },
    },
  ],
  closingQuote: {
    type: String,
    default:
      "Innovation thrives where expertise meets opportunity – consultancy bridges the path from ideas to impactful solutions.",
  },
  createdAt: { type: Date, default: Date.now },

});

const ConsultancyWork = mongoose.model("ConsultancyWork", ConsultancyWorkSchema);
export default ConsultancyWork;
