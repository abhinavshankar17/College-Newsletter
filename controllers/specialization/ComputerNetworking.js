import ComputerNetworking from '../../models/specialization/ComputerNetworking.js';

// Show Page
export const getComputerNetworking = async (req, res) => {
  try {
    const data = await ComputerNetworking.findOne();  // fetch one document

    

    res.render("specialization/computerNetworking", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching Computer Networking data");
  }
};

// Add new document (CRUD - Create)
export const addComputerNetworking = async (req, res) => {
  try {
    const newData = new ComputerNetworking(req.body);
    await newData.save();
    res.redirect("/specialization/computer-networking");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding Computer Networking data");
  }
};
