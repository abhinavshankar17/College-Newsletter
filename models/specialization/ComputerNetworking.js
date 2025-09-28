import mongoose from "mongoose";

const CloudNetworkingSchema = new mongoose.Schema({
  title: { type: String, required: false },

  description: { type: String, required: false },

  specializedLab: {
    name: { type: String, required: false },
    description: { type: String, required: false },
    equipment: [{ type: String, required: false }],
    supportedLicenses: [{ type: String, required: false }],
    imageUrl: { type: String, required: false },
  },

  memorandumOfUnderstanding: [
    {
      company: { type: String, required: false },
      details: { type: String, required: false },
      _id: false,
    },
  ],

  quote: {
    text: { type: String, required: false },
    author: { type: String, required: false },
  },
});

const CloudNetworking = mongoose.model("CloudNetworking", CloudNetworkingSchema);

export default CloudNetworking;
