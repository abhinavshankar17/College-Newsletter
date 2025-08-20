import mongoose from "mongoose";

const cloudComputingSchema = new mongoose.Schema({
  title: String,

  researchWorks: [{
    title: String,
    description: String,
    faculty: String,
    mentor: String,
    date: String
  }],

  collaborations: [{
    company: String,
    program: String,
    description: String,
    date: String,
    speakers: [String],
    studentsInvolved: Number,
    images: [String]
  }],

  workshops: [{
    title: String,
    description: String,
    dates: [String],
    resourcePersons: [String],
    participants: Number,
    images: [String]
  }],

  facultyAchievements: [{
    faculty: String,
    achievement: String,
    description: String,
    year: String
  }],

  studentAchievements: [{
    student: String,
    description: String,
    outcome: String
  }],

  internships: [{
    title: String,
    description: String,
    sponsor: String,
    studentsInvolved: Number
  }]
});

export default mongoose.model("CloudComputing", cloudComputingSchema);
