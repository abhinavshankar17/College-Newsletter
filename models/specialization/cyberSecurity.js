import mongoose from "mongoose";

const { Schema } = mongoose;

const publicationSchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  publisher: { type: String, required: false },
  date: { type: String, required: false },
});

const internshipSchema = new Schema({
  leader: { type: String, required: false },
  organization: { type: String, required: false },
  mentors: [{ type: String, required: false }],
  team: [{ type: String, required: false }],
  description: { type: String, required: false },
  techniques: [{ type: String, required: false }],
});

const certificationSchema = new Schema({
  faculty: [{ type: String, required: false }],
  program: { type: String, required: false },
  organization: { type: String, required: false },
  date: { type: String, required: false },
  grade: { type: String, required: false },
});

const collaborationSchema = new Schema({
  date: { type: String, required: false },
  partner: { type: String, required: false },
  organization: { type: String, required: false },
  description: { type: String, required: false },
  participants: [{ type: String, required: false }],
});

const cyberSecuritySchema = new Schema({
  title: { type: String, default: "Cyber Security" },
  introduction: { type: String, required: false },

  academicExcellence: {
    description: { type: String, required: false },
    facultyHighlights: [{ type: String, required: false }],
    publications: [publicationSchema],
  },

  internships: [internshipSchema],

  certifications: [certificationSchema],

  outreach: {
    programs: [{ type: String, required: false }],
    events: [{ type: String, required: false }],
  },

  collaborations: [collaborationSchema],

  quote: { type: String, required: false },
  images: { type: [String], default: [] }, // Ensure images is an array
});

export default mongoose.model("CyberSecurity", cyberSecuritySchema, "cybersecurities");
