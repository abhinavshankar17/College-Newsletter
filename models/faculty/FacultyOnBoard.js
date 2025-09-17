import mongoose from "mongoose";


const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String, // e.g. "Dr.", "Ms.", "Mr."
    required: false,
  },
  fullName: {
    type: String, // e.g. "Dr. K. Kanmani"
    required: true,
  },
  designation: {
    type: String, // e.g. "Assistant Professor", "Teaching Assistant"
    required: true,
  },
  grade: {
    type: String, // e.g. "Jr.G", can be null if not applicable
    default: null,
  },
  imageUrl: {
    type: String, // URL or local path to photo
    default: null,
  },
  joinedDate: {
    type: Date,
    default: Date.now, // store when added
  },
});

const FacultyOnBoard = mongoose.model("Faculty on Board", facultySchema);

export default FacultyOnBoard ;
