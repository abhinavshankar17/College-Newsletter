import mongoose from "mongoose";

const alumniActivitySchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: false,   // e.g., "Alumni Reunion 2025"
    trim: true
  },
  date: {
    type: Date,
    required: false    // e.g., "2025-04-26"
  },
  participantsCount: {
    type: Number,
    required: false,   // e.g., 50
  },
  participantsBatchRange: {
    type: String,     // e.g., "2014 to 2023"
    trim: true
  },
  convener: {
    name: {
      type: String,
      required: false, // e.g., "Dr. M. Lakshmi"
      trim: true
    },
    designation: {
      type: String,   // e.g., "Professor & Head"
      trim: true
    },
    department: {
      type: String,   // e.g., "Networking and Communications"
      trim: true
    },
    institution: {
      type: String,   // e.g., "SRMIST"
      trim: true
    }
  },
  eventOutcomes: {
    type: String,     // Full paragraph of event outcomes
    required: false,
    trim: true
  },
  photos: [
    {
      name: {
        type: String, // e.g., "Group Photo", "Panel Discussion"
        trim: true
      },
      imageUrl: {
        type: String, // URL or path to the photo
        required: false
      }
    }
  ],
  pageNumber: {
    type: Number,   
  }
}, { timestamps: true });

const AlumniActivityModel = mongoose.model("AlumniActivityModel", alumniActivitySchema);
export default AlumniActivityModel;