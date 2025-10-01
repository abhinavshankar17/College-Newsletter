import mongoose from "mongoose";

const FacultyArticleSchema = new mongoose.Schema({
  title: { type: String, required: false },
  author: {
    name: String,
    designation: String,
  },
  images: { type: [String], default: [] },
  content: { 
    type: String, 
    required: false
   },
  
     
  quotes: 
    {
      text: String,
    },
  
});

export default mongoose.model("FacultyArticle", FacultyArticleSchema);
