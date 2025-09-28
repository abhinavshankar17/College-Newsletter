import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: false }, // e.g., "Workshop on Unmasking the Digital Trail: Forensics Tools in Action"

  startDate: { type: Date, required: false }, // 08.04.2025
  endDate: { type: Date, required: false },   // 09.04.2025

  conveners: [
    {
      name: { type: String, required: false },
      designation: { type: String }
    }
  ],

  resourcePerson: {
    name: { type: String, required: false },
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
