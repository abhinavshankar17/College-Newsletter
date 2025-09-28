// models/InformationTechnology.js
import mongoose from "mongoose";

const informationTechnologySchema = new mongoose.Schema(
  {
    title: { type: String, default: "Information Technology" },

    // Doctoral Committee meetings
    doctoralCommittees: [
      {
        memberName: { type: String, required: false },
        details: { type: String, required: false },
        date: { type: String, required: false },
      },
    ],

    // PhD Awardees
    phdAwardees: [
      {
        name: { type: String, required: false },
        thesisTitle: { type: String, required: false },
        supervisor: { type: String, required: false },
        guidance: { type: String, required: false },
        description: { type: String, required: false },
        year: { type: String, required: false },
      },
    ],

    // Publications (journals, conferences, etc.)
    researchPublications: [
      {
        title: { type: String, required: false },
        authors: [{ type: String, required: false }],
        venue: { type: String, required: false },
        type: {
          type: String,
          enum: ["Journal", "Conference", "Book Chapter", "Workshop", "Other"],
          default: "Other",
        },
        date: { type: String, required: false },
        issnIsbn: { type: String, required: false },
        doi: { type: String, required: false },
        link: { type: String, required: false },
      },
    ],

    // Workshops & FDPs
    workshopsAndFDPs: [
      {
        title: { type: String, required: false },
        description: { type: String, required: false },
        organizer: { type: String, required: false },
        location: { type: String, required: false },
        dates: [{ type: String, required: false }],
        participants: [{ type: String, required: false }],
        images: [{ type: String, required: false }],
      },
    ],

    // Page/gallery images
    images: [{ type: String, required: false }],

    // Footer quote
    quote: {
      text: { type: String, required: false },
      author: { type: String, required: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model("InformationTechnology", informationTechnologySchema);
