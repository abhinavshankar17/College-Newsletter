import mongoose from "mongoose";

const guestLectureSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Genesis Mini Hack Web 3.0"
  date: { type: Date, required: true },

  conveners: [
    {
      name: { type: String, required: true },
      designation: { type: String }
    }
  ],

  resourcePerson: {
    name: { type: String, required: true },
    role: { type: String }
  },

  numberOfRegisteredParticipants: { type: Number, default: 0 },

  tracks: [
    {
      type: String,
      enum: [
        "Web3 & Blockchain",
        "AI & Machine Learning",
        "FinTech & Security",
        "Sustainability & Social Impact",
        "Open Innovation"
      ]
    }
  ],

  prizes: {
    firstPrize: { type: String },
    secondPrize: { type: String },
    participation: { type: String }
  },

  venue: { type: String },

  registration: {
    fee: { type: Number }, // per team
    teamSize: { type: Number } // max members
  },

  eventSummary: { type: String },

  imageUrl: [{ type: String }] // store image URLs/paths
});


const GuestLectureModel= mongoose.model("GuestLectureModel", guestLectureSchema);
export default GuestLectureModel;