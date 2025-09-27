import mongoose from "mongoose";

const CloudNetworkingSchema = new mongoose.Schema({
  title: { 
    type: String, 
  }, // e.g. "Computer Networking"

  description: { 
    type: String, 
  }, // the main intro paragraph

  specializedLab: {
    name: { type: String }, // "CISCO Center of Excellence (CoE)"
    description: { type: String }, // lab description
    equipment: [{ type: String }], // list of equipment
    supportedLicenses: [{ type: String }], // e.g. "Umbrella Security cloud", "Meraki solutions"
    imageUrl: { type: String }, // path to lab image if you store images
  },

 memorandumOfUnderstanding: [
    {
      company: { type: String },
      details: { type: String },
      _id: false, 
    }
  ],

  quote: {
    text: { type: String },
    author: { type: String },
  },
});

// Model name should match schema purpose
const CloudNetworking = mongoose.model("CloudNetworking", CloudNetworkingSchema);

export default CloudNetworking;
