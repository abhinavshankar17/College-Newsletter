import mongoose from "mongoose";

const FacultyArticleSchema= new mongoose.Schema({
  title: { type: String, required: true },   
  name: { type: String, required: true },   
  designation: { type: String, required: false },    
  images: { type: [String], default: [] },           
  description: { type: String, required: false }, 
  quote:{ type: String, required: false },
   
});

// 🔑 Static method for grouping faculty Article by title
FacultyArticleSchema.statics.getGroupedFacultyArticle = async function () {
  try {
    const Article = await this.find().lean();
    if (!Article || Article.length === 0) return {};

    // Group by 'title'
    const grouped = Article.reduce((groups, item) => {
      if (!groups[item.title]) {
        groups[item.title] = [];
      }
      groups[item.title].push(item);
      return groups;
    }, {});

    return grouped;
  } catch (error) {
    console.error("Error grouping faculty Article:", error);
    throw error;
  }
};

// 👇 Explicit collection name
const FacultyArticle = mongoose.model(
  "FacultyArticle",
  FacultyArticleSchema,
  "facultyArticle"
);

export default FacultyArticle;
