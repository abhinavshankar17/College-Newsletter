import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  date: { type: Date, required: true },
  conveners: [
    {
      name: { type: String, required: true },
      designation: { type: String, required: true }
    }
  ],
  coConveners: [
    {
      name: { type: String, required: true },
      designation: { type: String, required: true }
    }
  ],

  numberOfParticipants: { type: Number, required: true },
  eventSummary: { type: String, required: true },

  highlights: [{ type: String }],

  images: [
    {
      type: { type: String, enum: ["poster", "group_photo", "other"], default: "other" },
      url: { type: String, required: true }
    }
  ],

  organizers: { type: String, required: true },
  venue: { type: String, required: true }
}, {
  timestamps: true // createdAt, updatedAt
});

const CelebrationModel= mongoose.model("CelebrationModel", eventSchema);
export default CelebrationModel;

