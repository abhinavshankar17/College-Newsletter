import mongoose from "mongoose";

const cyberSecuritySchema = new mongoose.Schema({
  specializationName: { type: String, required: true }, // e.g., "Cyber Security"
  specializationDescription: { type: String, required: true }, // overall description

  academicExcellence: {
    topicName: { type: String, required: false }, // e.g., "Academic Excellence and Research Output"
    description: { type: String, required: false },
  },

  internshipsIndustryExposure: {
    topicName: { type: String, required: false }, // e.g., "Internship & Industry Exposure"
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
  },

  facultyDevelopmentCertifications: {
    topicName: { type: String, required: false }, // e.g., "Faculty Development & Certifications"
    description: { type: String, required: false },

  },

  outreachRecognitionEngagement: {
    topicName: { type: String, required: false }, // e.g., "Outreach, Recognition, and Engagement"
    description: { type: String, required: false },
  },

  internationalCollaborations: {
    topicName: { type: String, required: false }, // e.g., "International Collaborations"
    description: { type: String, required: false },
    images: { type: [String], default: [] },
  },

  quote: { type: String, required: false }, // e.g., “The best defense against cyber threats is not just technology…”
});

export default mongoose.model("CyberSecurity", cyberSecuritySchema);
