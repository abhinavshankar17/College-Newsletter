import mongoose from "mongoose";

const alumniActivitySchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: false,   // e.g., "Alumni Reunion 2025"
    trim: true
  },
  
  participantsCount: {
    type: Number,
    required: false,   // e.g., 50
  },
  participantsBatchRange: {
    type: String,     // e.g., "2014 to 2023"
    trim: true
  },
  convenername: {
      type: String,
      required: false, // e.g., "Dr. M. Lakshmi"
      trim: true
    },
    convenerdesignation: {
      type: String,   // e.g., "Professor & Head"
      trim: true
    },
    convenerdepartment: {
      type: String,   // e.g., "Networking and Communications"
      trim: true
    },
  eventOutcomes: {
    type: String,     // Full paragraph of event outcomes
    required: false,
    trim: true
  },
 
       images: { type: [String], default: [] },
  


});

const AlumniActivityModel = mongoose.model("AlumniActivityModel", alumniActivitySchema);
export default AlumniActivityModel;