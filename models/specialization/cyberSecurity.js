import mongoose from "mongoose";

const { Schema } = mongoose;

const publicationSchema = new Schema({
  title: String,
  description: String,
  publisher: String,
  date: String,
});

const internshipSchema = new Schema({
  leader: String,
  organization: String,
  mentors: [String],
  team: [String],
  description: String,
  techniques: [String],
});

const certificationSchema = new Schema({
  faculty: [String],
  program: String,
  organization: String,
  date: String,
  grade: String,
});

const collaborationSchema = new Schema({
  date: String,
  partner: String,
  organization: String,
  description: String,
  participants: [String],
});

const cyberSecuritySchema = new Schema({
  title: { type: String, default: "Cyber Security" },
  introduction: String,

  academicExcellence: {
    description: String,
    facultyHighlights: [String],
    publications: [publicationSchema],
  },

  internships: [internshipSchema],

  certifications: [certificationSchema],

  outreach: {
    programs: [String],
    events: [String],
  },

  collaborations: [collaborationSchema],

  quote: String,
  images: [String],
});

// Force Mongoose to use the correct collection
export default mongoose.model("CyberSecurity", cyberSecuritySchema, "cybersecurities");
