import mongoose from "mongoose";


const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  title: {
    type: String, // e.g. "Dr.", "Ms.", "Mr."
    required: false,
  },
  fullName: {
    type: String, // e.g. "Dr. K. Kanmani"
    required: false,
  },
  designation: {
    type: String, // e.g. "Assistant Professor", "Teaching Assistant"
    required: false,
  },
  grade: {
    type: String, // e.g. "Jr.G", can be null if not applicable
    default: null,
  },
  imageUrl: { type: [String], default: [] },
   // Ensure images is an array
  joinedDate: {
    type: Date,
    default: Date.now, // store when added
  },
});

const FacultyOnBoard = mongoose.model("FacultyonBoard", facultySchema);

export default FacultyOnBoard ;
