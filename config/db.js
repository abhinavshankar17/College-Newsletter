// config/db.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas connected successfully");

    // Load models after connection
    await loadModels(path.join(__dirname, "../models"));
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Load all models from the /models directory
const loadModels = async (dirPath) => {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await loadModels(fullPath);
    } else if (file.endsWith(".js")) {
      try {
        const model = await import(pathToFileURL(fullPath).href);
        const modelName = path.basename(file, ".js");
        models[modelName] = model.default;
      } catch (error) {
        console.error(`Error loading model ${file}:`, error);
      }
    }
  }
};

// Helper to extract schema fields
const getSchemas = () => {
  const schemaInfo = {};
  for (const key in models) {
    schemaInfo[key] = Object.keys(models[key].schema.paths).filter(
      (f) => f !== "__v" && f !== "_id"
    );
  }
  return schemaInfo;
};

export { connectDB, models, getSchemas };
