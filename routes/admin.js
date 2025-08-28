import express from "express";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

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

    await Promise.all(files.map(async (file) => {
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
    }));
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

// ✅ Add Article page (moved here)
router.get("/add-article", async (req, res) => {
  try {
    const { pages, schemas } = await buildPagesAndSchemas();
    res.render("admin/addArticle", { pages, schemas });
  } catch (err) {
    console.error("❌ Add Article error:", err);
    res.status(500).send("Failed to load Add Article page");
  }
});

export default router;
