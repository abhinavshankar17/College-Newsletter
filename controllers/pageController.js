// controllers/pageController.js
import { models } from "../config/db.js";

// helper: extract fields from a schema
function getSchemaFields(mongooseModel) {
  return Object.keys(mongooseModel.schema.paths).filter(
    f => f !== "__v" && f !== "_id"
  );
}

// ➕ Create
export const addArticle = async (req, res) => {
  try {
    const { model, data } = req.body;

    if (!models[model]) {
      return res.status(400).json({ message: "Invalid model name" });
    }

    const newDoc = new models[model](data);
    await newDoc.save();

    res.status(201).json({ message: `${model} added successfully`, newDoc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📖 Read
export const getPageData = async (req, res) => {
  try {
    const { model } = req.params;

    if (!models[model]) {
      return res.status(400).json({ message: "Invalid model name" });
    }

    const docs = await models[model].find();
    res.render("pages/pageView", { model, docs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// show add form dynamically
export const showAddForm = (req, res) => {
  // pages → dropdown 1
  const pages = {
    specialization: { models: ["Project", "Faculty"] },
    research: { models: ["Section"] }
    // add more here
  };

  // schemas → actual fields from mongoose models
  const schemas = {};
  Object.keys(models).forEach(m => {
    try {
      schemas[m] = getSchemaFields(models[m]);
    } catch (error) {
      console.error(`Error extracting schema for model ${m}:`, error);
    }
  });

  res.render("admin/addArticle", {
    title: "Add Article",
    pages,
    schemas
  });
};
