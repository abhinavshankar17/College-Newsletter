import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: false }, // e.g., "Workshop on Unmasking the Digital Trail: Forensics Tools in Action"

  description:{type: String, required: false},


  eventSummary: { type: String },

  images: { type: [String], default: [] } // Ensure images is an array
});

const Workshop = mongoose.model("Workshop", workshopSchema);
export default Workshop;
