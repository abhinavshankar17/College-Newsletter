import mongoose from "mongoose";

const OutreachActivitySchema = new mongoose.Schema({
  Activity1: {
  title: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  time: {
    type: String, // Example: "10:00 AM - 5:00 PM IST"
    required: false,
  },
  venue: {
    type: String,
    required: false,
  },
  participants: {
    type: String, // Example: "15 students and 6 faculty members"
  },
  coordinators: 
    {
      name: String,
     // Example: "Assistant Professor, NWC"
    },

  eventSummary: {
    type: String,
  },
  images: { type: [String], default: [] },
  },
  Activity2: {
  title: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  time: {
    type: String, // Example: "10:00 AM - 5:00 PM IST"
    required: false,
  },
  venue: {
    type: String,
    required: false,
  },
  participants: {
    type: String, // Example: "15 students and 6 faculty members"
  },
  coordinators: 
    {
      name: String,
     // Example: "Assistant Professor, NWC"
    },

  eventSummary: {
    type: String,
  },
  images: { type: [String], default: [] },
  },
 // Ensure images is an array
});

const OutreachActivityModel = mongoose.model("OutreachActivity", OutreachActivitySchema);
export default OutreachActivityModel;