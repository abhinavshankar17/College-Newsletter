// models/phdScholar.js
import mongoose from "mongoose";

const phdScholarSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: false,
  },
  description1:{
    type: String,
    required: false,
  },
  name2: {
    type: String,
    required: false,
  },
  description2:{
    type: String,
    required: false,
  },
  name3: {
    type: String,
    required: false,
  },
  description3:{
    type: String,
    required: false,
  },
  name4: {
    type: String,
    required: false,
  },
  description4:{
    type: String,
    required: false,
  },
  name5: {
    type: String,
    required: false,
  },
  description5:{
    type: String,
    required: false,
  },
  name6: {
    type: String,
    required: false,
  },
  description6:{
    type: String,
    required: false,
  }
});

const PhdScholar = mongoose.model("PhdScholar", phdScholarSchema);

export default PhdScholar;
