import mongoose from "mongoose";


const facultySchema = new mongoose.Schema({
  faculty1:{
    images: { type: [String], default: [] }, 
  name1: { type: String, required: false },
  designation1: { type: String, required: false },
 
  },
  faculty2:{
     images: { type: [String], default: [] }, 
  name2: { type: String, required: false },
  designation2: { type: String, required: false },
   },
 faculty3:{
   images: { type: [String], default: [] }, 
  name3: { type: String, required: false },
  designation3: { type: String, required: false },
 },

  faculty4:{
     images: { type: [String], default: [] }, 
  name4: { type: String, required: false },
  designation4: { type: String, required: false },
  },
  faculty5:{
     images: { type: [String], default: [] }, 
  name5: { type: String, required: false },
  designation5: { type: String, required: false },
  },
  faculty6:{
     images: { type: [String], default: [] }, 
  name6: { type: String, required: false },
  designation6: { type: String, required: false },
  },
   faculty7:{
     images: { type: [String], default: [] }, 
  name7: { type: String, required: false },
  designation7: { type: String, required: false },
   },
   faculty8:{
     images: { type: [String], default: [] }, 
  name8: { type: String, required: false },
  designation8: { type: String, required: false },
   },
   faculty9:{
     images: { type: [String], default: [] }, 
  name9: { type: String, required: false },
  designation9: { type: String, required: false },
   },
   faculty10:{
     images: { type: [String], default: [] }, 
  name10: { type: String, required: false },
  designation10: { type: String, required: false },
   },

});

const FacultyOnBoard = mongoose.model("FacultyonBoard", facultySchema);

export default FacultyOnBoard ;
