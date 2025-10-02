import mongoose from "mongoose";

const cyberSecuritySchema = new mongoose.Schema({
  title: { type: String, required: false }, // e.g., "Cyber Security"
  description: { type: String, required: false }, // Overview of the specialization
  AcademicExcellenceAndResearchOutput: {

     type: String, required: false
     },
  InternshiptAndIndustryExposure: { 
    description:{
     type: String, required: false 
    },
      images: { type: [String], default: [] },
  },
 
  FacultyDevelopmentAndCertifications:{ type: String, required: false },
  OutreachRecognitionAndEngagement:{type:String,required:false},
  InternationalCollaboration:{
    description:{
     type: String, required: false 
    },
      images: { type: [String], default: [] },
  },
  
  quote: { type: String, required: false }, // e.g., “The best defense against cyber threats is not just technology…”
});

export default mongoose.model("CyberSecurity", cyberSecuritySchema);
