
import express from "express";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import mongoose from "mongoose";
import upload from "../utils/upload.js"; // ✅ cloudinary + multer setup

const router = express.Router();
const modelsPath = path.join(process.cwd(), "models");

/**
 * Recursively extract schema fields
 */
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

/**
 * Build map of folders → models and models → schemas
 */
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

        const modelName = model.modelName;
        pages[folder].models.push(modelName);

        try {
          schemas[modelName] = extractSchemaFields(model.schema);
        } catch (err) {
          console.error(`❌ Error extracting schema for ${modelName}:`, err);
        }
      })
    );
  }

  return { pages, schemas };
}

/**
 * ✅ Define routes AFTER buildPagesAndSchemas is defined
 */

// List of folders + models
router.get("/pages", async (req, res) => {
  try {
    const { pages } = await buildPagesAndSchemas();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: "Failed to load pages" });
  }
});

// Schema fields
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

// ✅ Add Article page
router.get("/add-article", async (req, res) => {
  try {
    const { pages, schemas } = await buildPagesAndSchemas();
    res.render("admin/addArticle", { pages, schemas });
  } catch (err) {
    console.error("❌ Add Article error:", err);
    res.status(500).send("Failed to load Add Article page");
  }
});

// ✅ Handle form submission with Cloudinary upload
// ✅ accept all files (because field names vary, e.g. data[profileImage])
router.post("/add-article", upload.any(), async (req, res) => {
  try {
    console.log("🔍 Raw request body:", JSON.stringify(req.body, null, 2));
    
    const { model } = req.body;
    let formData = req.body.data || {};
    
    console.log("🔍 Form data before processing:", JSON.stringify(formData, null, 2));

    // ✅ Handle uploaded files from dynamic fields
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        // fieldname is like data[profileImage]
        const match = file.fieldname.match(/^data\[(.+)\]$/);
        if (match) {
          const fieldName = match[1]; // e.g. "profileImage"
          formData[fieldName] = file.path; // Cloudinary returns secure URL here
        }
      });
    }

    // 🚫 Clean reserved fields
    delete formData._id;
    delete formData.__v;

    // ✅ Convert date strings (dd/mm/yyyy → Date)
    for (const key in formData) {
      if (key.toLowerCase().includes("date") && typeof formData[key] === "string") {
        const parts = formData[key].split("/");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          formData[key] = new Date(`${year}-${month}-${day}`);
        }
      }
    }

    // ✅ Special handling for memorandumOfUnderstanding array
    // Check for flat structure first (memorandumOfUnderstanding.company, memorandumOfUnderstanding.details)
    if (formData['memorandumOfUnderstanding.company'] || formData['memorandumOfUnderstanding.details']) {
      console.log("🔍 Found flat MoU structure");
      
      const company = formData['memorandumOfUnderstanding.company'];
      const details = formData['memorandumOfUnderstanding.details'];
      
      if (company && details && company.trim() !== '' && details.trim() !== '') {
        formData.memorandumOfUnderstanding = [{
          company: company.trim(),
          details: details.trim()
        }];
        
        // Clean up the flat fields
        delete formData['memorandumOfUnderstanding.company'];
        delete formData['memorandumOfUnderstanding.details'];
        
        console.log("✅ Processed flat MoU data:", JSON.stringify(formData.memorandumOfUnderstanding, null, 2));
      }
    }
    // Check for nested structure (memorandumOfUnderstanding object)
    else if (formData.memorandumOfUnderstanding) {
      console.log("🔍 Raw MoU form data:", JSON.stringify(formData.memorandumOfUnderstanding, null, 2));
      
      const mouData = formData.memorandumOfUnderstanding;
      const processedMou = [];
      
      // Handle the nested structure that Express creates
      if (typeof mouData === 'object' && !Array.isArray(mouData)) {
        // Convert object with numeric keys to array
        Object.keys(mouData).forEach(key => {
          const index = parseInt(key);
          if (!isNaN(index) && mouData[key] && typeof mouData[key] === 'object') {
            processedMou[index] = mouData[key];
          }
        });
      } else if (Array.isArray(mouData)) {
        // Already an array
        processedMou.push(...mouData);
      }
      
      // Filter out empty objects and ensure we have valid data
      formData.memorandumOfUnderstanding = processedMou.filter(mou => 
        mou && mou.company && mou.details && mou.company.trim() !== '' && mou.details.trim() !== ''
      );
      
      console.log("✅ Processed nested MoU data:", JSON.stringify(formData.memorandumOfUnderstanding, null, 2));
    } else {
      console.log("❌ No memorandumOfUnderstanding found in form data");
    }

    const Model = mongoose.models[model];
    if (!Model) {
      return res.status(400).send("Invalid model selected");
    }

    // ✅ Debug logging for memorandumOfUnderstanding
    if (formData.memorandumOfUnderstanding) {
      console.log("📋 MoU Data being saved:", JSON.stringify(formData.memorandumOfUnderstanding, null, 2));
    }

    const doc = new Model(formData);
    await doc.save();

    res.render("admin/success", { message: `${model} saved successfully!` });
  } catch (err) {
    console.error("❌ Error saving document:", err);
    res.status(500).send("Failed to save data");
  }
});



export default router;
