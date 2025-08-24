import InformationTechnology from "../../models/specialization/InformationTechnology.js";

export const getInformationTechnology  = async (req, res) => {
  try {
    const data = await InformationTechnology.findOne();
    res.render("specialization/InformationTechnology", { data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Information Technology  data");
  }
};

// Add new document (CRUD - Create)
export const addInformationTechnology  = async (req, res) => {
  try {
    const newData = new InformationTechnology(req.body);
    await newData.save();
    res.redirect("/specialization/Information-Technology ");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Information Technology  data");
  }
};
