// models/InternetOfThings.js
import mongoose from "mongoose";

const internetOfThingsSchema = new mongoose.Schema({
  title: { type: String, default: "Internet of Things (IoT)" },

  // Research & Achievements (papers, awards, recognitions)
  researchWorks: [{
    title: String,          // e.g., "Smart Path Hold Direction..."
    description: String,    // paper/award description
    faculty: [String],      // involved people
    date: String,
    award: String           // e.g., "Best Paper Award"
  }],

  // Industry + Academia Collaborations / Expert Sessions
  collaborations: [{
    company: String,        // e.g., "Embien Technologies"
    program: String,        // e.g., "Expert Session"
    description: String,
    date: String,
    speakers: [String],     // e.g., "S. A. Saravana Pandian"
    studentsInvolved: Number,
    course: String,         // e.g., "21CSE368K"
    images: [String]
  }],

  // Community Engagement (lectures, outreach, healthcare sessions)
  communityEngagements: [{
    speaker: String,
    topic: String,
    event: String,
    location: String,
    date: String,
    organizer: String
  }],

  // Alumni Talks
  alumniEngagements: [{
    title: String,          // e.g., "Unlocking Global Higher Studies Insights"
    description: String,
    date: String,
    speaker: String,
    designation: String,
    alumniOf: String        // e.g., "NYU (Batch 2020-2024)"
  }],

  // Events (seminars, conferences, etc.)
  upcomingEvents: [{
    title: String,
    description: String,
    dates: [String],        // start & end dates
    scheme: String,         // e.g., "AICTE VAANI Scheme 2025-26"
    funding: String         // e.g., "₹2.2 Lakhs"
  }],

  // Faculty Achievements
  facultyAchievements: [{
    faculty: String,
    achievement: String,
    description: String,
    year: String,
    organizer: String,
    location: String
  }],

  // Awards & Accolades
  awards: [{
    recipient: String,
    awards: [String],       // ["NPTEL Discipline Star", "NPTEL Motivated Learner"]
    description: String
  }],

  // Labs & Infrastructure
  labs: [String],           // ["Intel Unnati IoT Lab", "Things of Future Lab"]

  // Faculty team
  expertFaculty: [{
    name: String,
    role: String            // e.g., "Professor", "Researcher"
  }],

  // Gallery Images
  images: [String],

  // Quote at the end
  quote: {
    text: String,
    author: String
  }
});

export default mongoose.model("InternetOfThings", internetOfThingsSchema);
