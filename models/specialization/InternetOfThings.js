// models/InformationTechnology.js
import mongoose from "mongoose";

const internetOfThingsSchema = new mongoose.Schema(
  {
   description: { type: String, required: false }, // Overview of the specialization
   ExpertFacultyAndInfrastructure:{type:String,required:false},
   AcademicAndIndustryIntegration:{
    description:{
        type:String,required:false
    },
    images: { type: [String], default: []},
  },
  ResearchExcellenceAndRecognition:{
    type:String,required:false
  },
  CommunityEngagementAndProfessionalExcellence:{
    type:String,required:false
  },
  AlumniEngagementAndGlobalExposure:{
    type:String,required:false
  },
  UpcomingEvents:{type:String,required:false},
  FacultyAchievements:{type:String,required:false},
  AwardsAndRewards:{type:String,required:false},
  Quote:{
    quote:{
      type:String,required:false
    },
    Author:{type:String,required:false}
  },

  },

);

export default mongoose.model("internetOfThings", internetOfThingsSchema );
