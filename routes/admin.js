import express from "express";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import mongoose from "mongoose";
import upload from "../utils/upload.js"; // multer + Cloudinary
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();
const modelsPath = path.join(process.cwd(), "models");

/* ============================
   Utilities
============================ */

// Recursively extract schema fields
function extractSchemaFields(schema, prefix = "") {
  const fields = {};
  schema.eachPath((pathname, schemaType) => {
    const fullPath = prefix ? `${prefix}.${pathname}` : pathname;

    if (schemaType.schema) {
      Object.assign(fields, extractSchemaFields(schemaType.schema, fullPath));
    } else if (schemaType.$isSingleNested) {
      Object.assign(fields, extractSchemaFields(schemaType.caster.schema, fullPath));
    } else if (schemaType.$isMongooseDocumentArray) {
      Object.assign(fields, extractSchemaFields(schemaType.schema, fullPath + "[]"));
    } else {
      fields[fullPath] = schemaType.instance;
    }
  });
  return fields;
}

// Build pages → models and model → schema map
async function buildPagesAndSchemas() {
  const pages = {};
  const schemas = {};
  const folders = fs.readdirSync(modelsPath);

  for (const folder of folders) {
    const folderPath = path.join(modelsPath, folder);
    if (!fs.lstatSync(folderPath).isDirectory()) continue;

    pages[folder] = { models: [] };

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));
    await Promise.all(
      files.map(async (file) => {
        const fileUrl = pathToFileURL(path.join(folderPath, file)).href;

        let importedModule;
        try {
          importedModule = await import(fileUrl);
        } catch (err) {
          console.error(`❌ Error importing model ${file}:`, err);
          return;
        }

        const model = importedModule.default;
        if (!model || !model.modelName) {
          console.error(`❌ No valid mongoose model in ${file}`);
          return;
        }

        pages[folder].models.push(model.modelName);
        try {
          schemas[model.modelName] = extractSchemaFields(model.schema);
        } catch (err) {
          console.error(`❌ Error extracting schema for ${model.modelName}:`, err);
        }
      })
    );
  }

  return { pages, schemas };
}

/* ============================
   Admin Routes
============================ */

// GET: List of folders + models
router.get("/pages", async (req, res) => {
  try {
    const { pages } = await buildPagesAndSchemas();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: "Failed to load pages" });
  }
});

// GET: Schema fields for a model
router.get("/schema/:modelName", async (req, res) => {
  try {
    const { schemas } = await buildPagesAndSchemas();
    const schema = schemas[req.params.modelName];
    if (!schema) return res.status(404).json({ error: "Schema not found" });
    res.json(Object.keys(schema));
  } catch (err) {
    res.status(500).json({ error: "Failed to load schema" });
  }
});

// GET: Add Article page
router.get("/add-article", async (req, res) => {
  try {
    const { pages, schemas } = await buildPagesAndSchemas();
    res.render("admin/addArticle", { pages, schemas });
  } catch (err) {
    console.error("❌ Add Article error:", err);
    res.status(500).send("Failed to load Add Article page");
  }
});

// POST: Add Article with Cloudinary upload
router.post("/add-article", upload.any(), async (req, res) => {
  try {
    const { model } = req.body;
    let formData = req.body.data || {};

  
    // Handle uploaded files (single + multiple)
if (req.files && req.files.length > 0) {
  req.files.forEach(file => {
    const match = file.fieldname.match(/^data\[(.+?)\](\[\])?$/);
    if (match) {
      const fieldName = match[1];

      // Only store the URL string if your schema expects [String]
      const fileUrl = file.path; // or file.path / file.secure_url depending on your upload method

      if (match[2] === "[]") {
        if (!Array.isArray(formData[fieldName])) formData[fieldName] = [];
        formData[fieldName].push(fileUrl); // <-- only the URL string
      } else {
        formData[fieldName] = fileUrl;
      }
    }
  });
}


    // Clean reserved fields safely
    if (!formData._id || formData._id.trim() === "") {
      delete formData._id;
    }
    delete formData.__v;

    // Convert date strings (dd/mm/yyyy → Date)
    // Convert date strings (handle dd/mm/yyyy or dd-mm-yyyy)
for (const key in formData) {
  if (key.toLowerCase().includes("date") && typeof formData[key] === "string") {
    let rawDate = formData[key].trim();

    // Support both "26-04-2025" and "26/04/2025"
    const separator = rawDate.includes("-") ? "-" : "/";
    const [day, month, year] = rawDate.split(separator);

    if (day && month && year) {
      formData[key] = new Date(`${year}-${month}-${day}`);
    }
  }
}


    // ✅ Normalize imageUrl (accept array, object, or string)
    // ✅ Normalize imageUrl (always keep as array of URLs)
if (formData.imageUrl) {
  if (Array.isArray(formData.imageUrl)) {
    // Convert array of objects [{ url, public_id }] → [url, url]
    formData.imageUrl = formData.imageUrl.map(img =>
      typeof img === "object" && img.url ? img.url : img
    );
  } else if (typeof formData.imageUrl === "object" && formData.imageUrl.url) {
    formData.imageUrl = [formData.imageUrl.url];
  } else if (typeof formData.imageUrl === "string") {
    formData.imageUrl = [formData.imageUrl];
  }
}


    // Handle MoU array (flat or nested)
    if (formData['memorandumOfUnderstanding.company'] || formData['memorandumOfUnderstanding.details']) {
      const company = formData['memorandumOfUnderstanding.company'];
      const details = formData['memorandumOfUnderstanding.details'];
      if (company && details && company.trim() && details.trim()) {
        formData.memorandumOfUnderstanding = [
          { company: company.trim(), details: details.trim() }
        ];
        delete formData['memorandumOfUnderstanding.company'];
        delete formData['memorandumOfUnderstanding.details'];
      }
    } else if (formData.memorandumOfUnderstanding) {
      const mouData = formData.memorandumOfUnderstanding;
      const processedMou = [];
      if (typeof mouData === "object" && !Array.isArray(mouData)) {
        Object.keys(mouData).forEach(key => {
          const index = parseInt(key);
          if (!isNaN(index) && mouData[key] && typeof mouData[key] === "object") {
            processedMou[index] = mouData[key];
          }
        });
      } else if (Array.isArray(mouData)) {
        processedMou.push(...mouData);
      }

      formData.memorandumOfUnderstanding = processedMou.filter(
        mou => mou && mou.company && mou.details && mou.company.trim() && mou.details.trim()
      );
    }

    const Model = mongoose.models[model];
    if (!Model) return res.status(400).send("Invalid model selected");

    // Always create a fresh document (no _id reuse)
    const doc = new Model(formData);
    await doc.save();

    res.render("admin/success", { message: `${model} saved successfully!` });
  } catch (err) {
    console.error("❌ Error saving document:", err);
    res.status(500).send("Failed to save data");
  }
});

// DELETE: Delete document + associated Cloudinary images (works for all models)
router.delete("/delete/:model/:id", async (req, res) => {
  try {
    const { model, id } = req.params;
    const Model = mongoose.models[model];
    if (!Model) return res.status(400).send("Invalid model");

    const doc = await Model.findById(id);
    if (!doc) return res.status(404).send("Document not found");

    const data = doc.toObject();

    // Delete single and multiple images dynamically
    for (const key in data) {
      const value = data[key];

      // Single image object
      if (value && typeof value === "object" && value.public_id) {
        await cloudinary.uploader.destroy(value.public_id);
      }

      // Array of image objects
      if (Array.isArray(value)) {
        for (const img of value) {
          if (img && img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        }
      }
    }

    // Delete the document from DB
    await Model.findByIdAndDelete(id);

    res.json({ message: `${model} deleted successfully` });
  } catch (err) {
    console.error("❌ Error deleting document:", err);
    res.status(500).send("Failed to delete");
  }
});

// DELETE single Cloudinary image
router.post("/delete-image", async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ success: false, message: "Missing public_id" });

    await cloudinary.uploader.destroy(public_id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting image:", err);
    res.status(500).json({ success: false });
  }
});

export default router;
