import mongoose from "mongoose";

const cloudComputingSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  researchWorks: 
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
    
    },
  

  collaborations:
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      images: { type: [String], default: [] }, // Ensure images is an array
    },
  

  workshops:
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      images: { type: [String], default: [] },
    },
  

  facultyAchievements:
    {
      faculty: { type: String, required: false },
      description: { type: String, required: false },
     
    },
  

  studentAchievements:
    {
      student: { type: String, required: false },
      description: { type: String, required: false },
    
    },
  

  internships:
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
   
    },
  
});

export default mongoose.model("CloudComputing", cloudComputingSchema);
