import mongoose from "mongoose";

const FacultyArticleSchema = new mongoose.Schema({
  title1: { type: String, required: false },
  author1: {
    name: String,
    designation: String,
    images: { type: [String], default: [] },
  },
  
  content1: { 
    type: String, 
    required: false
   },
  
     
  quotes1: 
    {
      text: String,
    },
      title2: { type: String, required: false },
  author2: {
    name: String,
    designation: String,
    images: { type: [String], default: [] },
  },
  
  content2: { 
    type: String, 
    required: false
   },
  
     
  quotes2: 
    {
      text: String,
    },
  
});

export default mongoose.model("FacultyArticle", FacultyArticleSchema);
