import InformationTechnology from "../../models/specialization/InformationTechnology.js";

// Get Information Technology page
export const getInformationTechnology = async (req, res) => {
  try {
    // Fetch the first document in the collection
    const data = await InformationTechnology.findOne().lean(); // use .lean() for EJS
    res.render("specialization/InformationTechnology", { data });
  } catch (err) {
    console.error("Error fetching Information Technology data:", err);
    res.status(500).send("Error fetching Information Technology data");
  }
};

// Add new Information Technology document
export const addInformationTechnology = async (req, res) => {
  try {
    const newData = new InformationTechnology(req.body);
    await newData.save();
    res.redirect("/specialization/information-technology");
  } catch (err) {
    console.error("Error adding Information Technology data:", err);
    res.status(500).send("Error adding Information Technology data");
  }
};
