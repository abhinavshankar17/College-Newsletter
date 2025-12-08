import mongoose from "mongoose";

const alumniActivitySchema = new mongoose.Schema({
   title: {
    type: String,
    required: false,   // e.g., "Alumni Reunion 2025"
    trim: true
  },
  Date: {
    type: String,
    required: false,   // e.g., "Alumni Reunion 2025"
    trim: true
  },
  
  Time: {
    type: String,
    required: false,   // e.g., 50
  },
   Venue: {
    type: String,     // e.g., "2014 to 2023"
    trim: true
  },
  Participants: {
      type: String,
      required: false, // e.g., "Dr. M. Lakshmi"
      trim: true
    },
    ResoursePerson: {
      type: String,   // e.g., "Professor & Head"
      trim: true
    },
    convener: {
      type: String,   // e.g., "Networking and Communications"
      trim: true
    },
  eventsummary: {
    type: String,     // Full paragraph of event outcomes
    required: false,
    trim: true
  },
  eventoutcome: {
    type: String,     // Full paragraph of event outcomes
    required: false,
    trim: true
  },
       images: { type: [String], default: [] },
  


});

const AlumniActivityModel = mongoose.model("AlumniActivityModel", alumniActivitySchema);
export default AlumniActivityModel;