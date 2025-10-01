import mongoose from "mongoose";

const facultyUpskillingSchema = new mongoose.Schema({
  faculty1:{
    images: { type: [String], default: [] },
    name: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    default: "Assistant Professor",
  },
  department: {
    type: String,
    default: "NWC, SRMIST",
  },
  description: 
  { type: String,
     required: false
    },

  },
  
  faculty2:{
    images: { type: [String], default: [] },
    name: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    default: "Assistant Professor",
  },
  department: {
    type: String,
    default: "NWC, SRMIST",
  },
  description:
  { type: String,
      required: false
    },
  },
  
  faculty3:{
    images: { type: [String], default: [] },
    name: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    default: "Assistant Professor",
  },
  department: {
    type: String,
    default: "NWC, SRMIST",
  },
  description:
  { type: String,
      required: false
    },
  },
    
  faculty4:{
    images: { type: [String], default: [] },
    name: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    default: "Assistant Professor",
  },
  department: {
    type: String,
    default: "NWC, SRMIST",
  },
  description:
  { type: String,
      required: false
    },
  },

  faculty5:{
    images: { type: [String], default: [] },
    name: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    default: "Assistant Professor",
  },
  department: {
    type: String,
    default: "NWC, SRMIST",
  },
  description:
  { type: String,
      required: false
    },
  },








});

const FacultyUpskilling = mongoose.model(
  "FacultyUpskilling",
  facultyUpskillingSchema
);

export default FacultyUpskilling;
