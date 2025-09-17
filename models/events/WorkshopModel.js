import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Workshop on Unmasking the Digital Trail: Forensics Tools in Action"

  startDate: { type: Date, required: true }, // 08.04.2025
  endDate: { type: Date, required: true },   // 09.04.2025

  conveners: [
    {
      name: { type: String, required: true },
      designation: { type: String }
    }
  ],

  resourcePerson: {
    name: { type: String, required: true },
    role: { type: String },
    organization: { type: String }
  },

  numberOfRegisteredParticipants: { type: Number, default: 0 },

  venue: { type: String }, // e.g., "Tech Park"

  eventSummary: { type: String },

  imageUrl: [{ type: String }] // store image URLs/paths
});

const Workshop = mongoose.model("Workshop", workshopSchema);
export default Workshop;
