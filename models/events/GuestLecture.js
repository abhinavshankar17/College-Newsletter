import mongoose from "mongoose";

const guestLectureSchema = new mongoose.Schema({
  title: { type: String, required: false }, // e.g., "Genesis Mini Hack Web 3.0"
 

  conveners: 
    {
      name: { type: String, required: false },
    
    }
  ,

  resourcePerson: {
    name: { type: String, required: false },
   
  },

  numberOfRegisteredParticipants: { type: Number, default: 0 },


  eventSummary: { type: String },

  images: { type: [String], default: [] } // Ensure images is an array
});

const GuestLectureModel = mongoose.model("GuestLectureModel", guestLectureSchema);
export default GuestLectureModel;