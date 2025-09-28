// models/InternetOfThings.js
import mongoose from "mongoose";

const internetOfThingsSchema = new mongoose.Schema({
  title: { type: String, default: "Internet of Things (IoT)" },

  // Research & Achievements (papers, awards, recognitions)
  researchWorks: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      faculty: [{ type: String, required: false }],
      date: { type: String, required: false },
      award: { type: String, required: false },
    },
  ],

  // Industry + Academia Collaborations / Expert Sessions
  collaborations: [
    {
      company: { type: String, required: false },
      program: { type: String, required: false },
      description: { type: String, required: false },
      date: { type: String, required: false },
      speakers: [{ type: String, required: false }],
      studentsInvolved: { type: Number, required: false },
      course: { type: String, required: false },
      images: [{ type: String, required: false }],
    },
  ],

  // Community Engagement (lectures, outreach, healthcare sessions)
  communityEngagements: [
    {
      speaker: { type: String, required: false },
      topic: { type: String, required: false },
      event: { type: String, required: false },
      location: { type: String, required: false },
      date: { type: String, required: false },
      organizer: { type: String, required: false },
    },
  ],

  // Alumni Talks
  alumniEngagements: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      date: { type: String, required: false },
      speaker: { type: String, required: false },
      designation: { type: String, required: false },
      alumniOf: { type: String, required: false },
    },
  ],

  // Events (seminars, conferences, etc.)
  upcomingEvents: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      dates: [{ type: String, required: false }],
      scheme: { type: String, required: false },
      funding: { type: String, required: false },
    },
  ],

  // Faculty Achievements
  facultyAchievements: [
    {
      faculty: { type: String, required: false },
      achievement: { type: String, required: false },
      description: { type: String, required: false },
      year: { type: String, required: false },
      organizer: { type: String, required: false },
      location: { type: String, required: false },
    },
  ],

  // Awards & Accolades
  awards: [
    {
      recipient: { type: String, required: false },
      awards: [{ type: String, required: false }],
      description: { type: String, required: false },
    },
  ],

  // Labs & Infrastructure
  labs: [{ type: String, required: false }],

  // Faculty team
  expertFaculty: [
    {
      name: { type: String, required: false },
      role: { type: String, required: false },
    },
  ],

  // Gallery Images
  images: { type: [String], default: [] }, // Ensure images is an array

  // Quote at the end
  quote: {
    text: { type: String, required: false },
    author: { type: String, required: false },
  },
});

export default mongoose.model("InternetOfThings", internetOfThingsSchema);
