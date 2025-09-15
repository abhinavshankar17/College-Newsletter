import mongoose from "mongoose";

const FacultyArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: {
    name: String,
    designation: String,
    department: String,
    institution: String
  },
  coverImage: String,
  sections: [
    {
      heading: String,
      content: String,
      images: [String],
      listItems: [String]
    }
  ],
  quotes: [
    {
      text: String,
      author: String
    }
  ],
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("FacultyArticle", FacultyArticleSchema);
