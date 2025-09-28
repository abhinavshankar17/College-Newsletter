import mongoose from "mongoose";

const FacultyArticleSchema = new mongoose.Schema({
  title: { type: String, required: false },
  author: {
    name: String,
    designation: String,
    department: String,
    institution: String,
  },
  coverImage: String,
  sections: [
    {
      heading: String,
      content: String,
      images: { type: [String], default: [] }, // Ensure images is an array
      listItems: [String],
    },
  ],
  quotes: [
    {
      text: String,
      author: String,
    },
  ],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FacultyArticle", FacultyArticleSchema);
