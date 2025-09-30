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
    // Transform req.body to match schema structure
    const data = {
      title: req.body.title,
      description: req.body.description,
      researchWorks: Array.isArray(req.body['researchWorks.title'])
        ? req.body['researchWorks.title'].map((title, i) => ({
            title,
            description: req.body['researchWorks.description'][i]
          }))
        : req.body['researchWorks.title']
        ? [{
            title: req.body['researchWorks.title'],
            description: req.body['researchWorks.description']
          }]
        : [],
      // Repeat similar transformation for collaborations, workshops, etc.
      // For images, use req.files and map to the correct field
    };

    const newData = new CloudComputing(data);
    await newData.save();
    res.redirect("/specialization/cloud-computing");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Cloud Computing data");
  }
};


