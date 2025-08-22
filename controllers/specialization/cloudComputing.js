import CloudComputing from "../../models/specialization/CloudComputing.js";

// Show Page
export const getCloudComputing = async (req, res) => {
  try {
    const data = await CloudComputing.findOne();
    res.render("specialization/cloudComputing", { data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching Cloud Computing data");
  }
};

// Add new document (CRUD - Create)
export const addCloudComputing = async (req, res) => {
  try {
    const newData = new CloudComputing(req.body);
    await newData.save();
    res.redirect("/specialization/cloud-computing");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Cloud Computing data");
  }
};
