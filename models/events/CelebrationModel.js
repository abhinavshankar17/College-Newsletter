import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: false },
  date: { type: Date, required: false },
  conveners: [
    {
      name: { type: String, required: false },
      designation: { type: String, required: false }
    }
  ],
  coConveners: [
    {
      name: { type: String, required: false },
      designation: { type: String, required: false }
    }
  ],

  numberOfParticipants: { type: Number, required: false },
  eventSummary: { type: String, required: false },

  highlights: [{ type: String }],

  images: [
    {
      type: { type: String, enum: ["poster", "group_photo", "other"], default: "other" },
      url: { type: String, required: false }
    }
  ],

  organizers: { type: String, required: false },
  venue: { type: String, required: false }
}, {
  timestamps: true // createdAt, updatedAt
});

const CelebrationModel = mongoose.model("CelebrationModel", eventSchema);
export default CelebrationModel;

