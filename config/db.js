// config/db.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/college_newsletter", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully (local)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const models = {};

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

// Load models from /models
await loadModels(path.join(__dirname, "../models"));

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
