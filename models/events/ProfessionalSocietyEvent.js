import mongoose from "mongoose";

const professionalSocietyEventSchema = new mongoose.Schema({
  heading: {
    type: String,
 
  },
  subheading: {
    type: String
  },
  description: {
    type: String
  },
  images: [
    {
      type: String
    }
  ]
});

export default mongoose.model(
  "ProfessionalSocietyEvent",
  professionalSocietyEventSchema
);