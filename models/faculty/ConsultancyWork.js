import mongoose from "mongoose";

const ConsultancyWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  collaboratingAgency: { type: String, required: true },
  consultancyAmount: { type: Number, required: true },
  department: { type: String, default: "Networking and Communications" },
  duration: {
    start: { type: Date },
    end: { type: Date },
  },
  projectDescription: { type: String, required: true },
  teamMembers: [
    {
      name: { type: String, required: true },
      designation: { type: String },
      department: { type: String, default: "NWC, SRMIST" },
      photoUrl: { type: String },
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
