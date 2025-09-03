import dotenv from "dotenv";
dotenv.config();  // ✅ load env first

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,   // ✅ match .env
  api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ match .env
});

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ set" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ set" : "❌ missing",
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "college_newsletter",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
