// models/InformationTechnology.js
import mongoose from "mongoose";

const informationTechnologySchema = new mongoose.Schema(
  {
    title: { type: String, default: "Information Technology" },

    // Doctoral Committee meetings
    doctoralCommittees: [{
      memberName: String,
      details: String,
      date: String            // keep as String for easy brochure-style dates
    }],

    // PhD Awardees
    phdAwardees: [{
      name: String,
      thesisTitle: String,
      supervisor: String,
      guidance: String,
      description: String,
      year: String
    }],

    // Publications (journals, conferences, etc.)
    researchPublications: [{
      title: String,
      authors: [String],
      venue: String,          // journal or conference name
      type: {
        type: String,
        enum: ["Journal", "Conference", "Book Chapter", "Workshop", "Other"],
        default: "Other"
      },
      date: String,
      issnIsbn: String,
      doi: String,
      link: String
    }],

    // Workshops & FDPs
    workshopsAndFDPs: [{
      title: String,
      description: String,
      organizer: String,
      location: String,
      dates: [String],        // start/end or multi-day
      participants: [String],
      images: [String]
    }],

    // Page/gallery images
    images: [String],

    // Footer quote
    quote: {
      text: String,
      author: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("InformationTechnology", informationTechnologySchema);
