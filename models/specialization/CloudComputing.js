import mongoose from "mongoose";

const cloudComputingSchema = new mongoose.Schema({
  title: { type: String, required: false },

  researchWorks: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      faculty: { type: String, required: false },
      mentor: { type: String, required: false },
      date: { type: String, required: false },
    },
  ],

  collaborations: [
    {
      company: { type: String, required: false },
      program: { type: String, required: false },
      description: { type: String, required: false },
      date: { type: String, required: false },
      speakers: [{ type: String, required: false }],
      studentsInvolved: { type: Number, required: false },
      images: { type: [String], default: [] }, // Ensure images is an array
    },
  ],

  workshops: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      dates: [{ type: String, required: false }],
      resourcePersons: [{ type: String, required: false }],
      participants: { type: Number, required: false },
      images: [{ type: String, required: false }],
    },
  ],

  facultyAchievements: [
    {
      faculty: { type: String, required: false },
      achievement: { type: String, required: false },
      description: { type: String, required: false },
      year: { type: String, required: false },
    },
  ],

  studentAchievements: [
    {
      student: { type: String, required: false },
      description: { type: String, required: false },
      outcome: { type: String, required: false },
    },
  ],

  internships: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      sponsor: { type: String, required: false },
      studentsInvolved: { type: Number, required: false },
    },
  ],
});

export default mongoose.model("CloudComputing", cloudComputingSchema);
