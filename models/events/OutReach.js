import mongoose from "mongoose";

const OutreachActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Example: "10:00 AM - 5:00 PM IST"
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  participants: {
    type: String, // Example: "15 students and 6 faculty members"
  },
  convener: {
    type: String, // For events where a single convener exists
  },
  coordinators: [
    {
      name: String,
      designation: String, // Example: "Assistant Professor, NWC"
    },
  ],
  coConveners: [
    {
      name: String,
      designation: String,
    },
  ],
  eventSummary: {
    type: String,
  },
  imageUrl: [
    {
      url: String,
      description: String,
    },
  ],
});


const OutreachActivityModel = mongoose.model("OutreachActivity", OutreachActivitySchema );
export default OutreachActivityModel;