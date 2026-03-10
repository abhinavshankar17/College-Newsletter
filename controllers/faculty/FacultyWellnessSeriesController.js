import FacultyWellnessSeries from "../../models/faculty/FacultyWellnessSeries.js";

export const getFacultyWellnessSeries = async (req, res) => {
  try {

    const wellness = await FacultyWellnessSeries.find().sort({ _id: 1 });

    res.render("faculty/facultywellnessseries", { wellness });

  } catch (error) {
    console.error(error);
    res.send("Error loading Faculty Wellness Series");
  }
};

export const addFacultyWellnessSeries = async (req, res) => {
  try {

    const { title, description, images } = req.body;

    const newSession = new FacultyWellnessSeries({
      title,
      description,
      images
    });

    await newSession.save();

    res.redirect("/faculty-wellness-series");

  } catch (error) {
    console.error(error);
    res.send("Error adding Faculty Wellness Series");
  }
};
