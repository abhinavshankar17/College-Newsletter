import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: false },
  description: { type: String, required: false },
  

  numberOfParticipants: { type: Number, required: false },
  eventSummary: { type: String, required: false },


  images: { type: [String], default: [] }, // Ensure images is an array


}, {
  timestamps: true // createdAt, updatedAt
});

const CelebrationModel = mongoose.model("CelebrationModel", eventSchema);
export default CelebrationModel;

