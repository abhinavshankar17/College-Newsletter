import express from "express";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import upload from "../utils/upload.js"; // multer + Cloudinary
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();
const modelsPath = path.join(process.cwd(), "models");

// ============================
// Admin Model
// ============================
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

// ============================
// Middleware to protect routes
// ============================
async function isAuthenticated(req, res, next) {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    return res.redirect("/admin/signup"); // if no admin, redirect to signup
  }

  if (req.session && req.session.admin) {
    return next(); // admin is logged in
  }
  res.redirect("/admin/login"); // not logged in
}

// ============================
// Admin Authentication Routes
// ============================

// GET signup page (allow only if no admin exists)
router.get("/signup", async (req, res) => {
  const adminCount = await Admin.countDocuments();
  if (adminCount >= 1) {
    return res.redirect("/admin/login");
  }
  res.render("admin/signup");
});



// POST signup (allow only one admin)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).send("All fields are required!");

    const adminCount = await Admin.countDocuments();
    if (adminCount >= 1) {
      // Only one admin allowed
      return res.send("Admin already exists. Please login.");
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) return res.status(400).send("Email already exists!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await admin.save();
    res.redirect("/admin/login");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send(`Error creating admin account: ${err.message}`);
  }
});


// GET login page
router.get("/login", async (req, res) => {
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    return res.redirect("/admin/signup"); // if no admin exists, go to signup
  }
  res.render("admin/login");
});

// POST login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Email and password required");

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.send("Admin not found");

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.send("Incorrect password");

    req.session.admin = admin;
    res.redirect("/admin/add-article");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Error logging in");
  }
});

// GET logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
});

// ============================
// Utilities (Unchanged)
// ============================

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

// ============================
// Admin Routes (Protected)
// ============================

// GET: List of folders + models
router.get("/pages", isAuthenticated, async (req, res) => {
  try {
    const { pages } = await buildPagesAndSchemas();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: "Failed to load pages" });
  }
});

// GET: Schema fields for a model
router.get("/schema/:modelName", isAuthenticated, async (req, res) => {
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
router.get("/add-article", isAuthenticated, async (req, res) => {
  try {
    const { pages, schemas } = await buildPagesAndSchemas();
    res.render("admin/addArticle", { pages, schemas });
  } catch (err) {
    console.error("❌ Add Article error:", err);
    res.status(500).send("Failed to load Add Article page");
  }
});

// POST: Add Article with Cloudinary upload
router.post("/add-article", isAuthenticated, upload.any(), async (req, res) => {
  try {
    const { model } = req.body;
    let formData = req.body.data || {};

    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const match = file.fieldname.match(/^data\[(.+?)\](\[\])?$/);
        if (match) {
          const fieldName = match[1];
          const fileUrl = file.path;

          if (match[2] === "[]") {
            if (!Array.isArray(formData[fieldName])) formData[fieldName] = [];
            formData[fieldName].push(fileUrl);
          } else {
            formData[fieldName] = fileUrl;
          }
        }
      });
    }

    if (!formData._id || formData._id.trim() === "") {
      delete formData._id;
    }
    delete formData.__v;

    for (const key in formData) {
      if (key.toLowerCase().includes("date") && typeof formData[key] === "string") {
        let rawDate = formData[key].trim();
        const separator = rawDate.includes("-") ? "-" : "/";
        const [day, month, year] = rawDate.split(separator);
        if (day && month && year) {
          formData[key] = new Date(`${year}-${month}-${day}`);
        }
      }
    }

    if (formData.imageUrl) {
      if (Array.isArray(formData.imageUrl)) {
        formData.imageUrl = formData.imageUrl.map(img =>
          typeof img === "object" && img.url ? img.url : img
        );
      } else if (typeof formData.imageUrl === "object" && formData.imageUrl.url) {
        formData.imageUrl = [formData.imageUrl.url];
      } else if (typeof formData.imageUrl === "string") {
        formData.imageUrl = [formData.imageUrl];
      }
    }

    if (formData["memorandumOfUnderstanding.company"] || formData["memorandumOfUnderstanding.details"]) {
      const company = formData["memorandumOfUnderstanding.company"];
      const details = formData["memorandumOfUnderstanding.details"];
      if (company && details && company.trim() && details.trim()) {
        formData.memorandumOfUnderstanding = [
          { company: company.trim(), details: details.trim() },
        ];
        delete formData["memorandumOfUnderstanding.company"];
        delete formData["memorandumOfUnderstanding.details"];
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
        mou =>
          mou &&
          mou.company &&
          mou.details &&
          mou.company.trim() &&
          mou.details.trim()
      );
    }

    const Model = mongoose.models[model];
    if (!Model) return res.status(400).send("Invalid model selected");

    const doc = new Model(formData);
    await doc.save();

    res.render("admin/success", { message: `${model} saved successfully!` });
  } catch (err) {
    console.error("❌ Error saving document:", err);
    res.status(500).send("Failed to save data");
  }
});

// DELETE routes (unchanged)
router.delete("/delete/:model/:id", isAuthenticated, async (req, res) => {
  try {
    const { model, id } = req.params;
    const Model = mongoose.models[model];
    if (!Model) return res.status(400).send("Invalid model");

    const doc = await Model.findById(id);
    if (!doc) return res.status(404).send("Document not found");

    const data = doc.toObject();

    for (const key in data) {
      const value = data[key];
      if (value && typeof value === "object" && value.public_id) {
        await cloudinary.uploader.destroy(value.public_id);
      }
      if (Array.isArray(value)) {
        for (const img of value) {
          if (img && img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        }
      }
    }

    await Model.findByIdAndDelete(id);
    res.json({ message: `${model} deleted successfully` });
  } catch (err) {
    console.error("❌ Error deleting document:", err);
    res.status(500).send("Failed to delete");
  }
});

router.post("/delete-image", isAuthenticated, async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res.status(400).json({ success: false, message: "Missing public_id" });

    await cloudinary.uploader.destroy(public_id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting image:", err);
    res.status(500).json({ success: false });
  }
});

export default router;
