import LectureSeries from "../../models/events/LectureSeries.js";

export const getLectureSeries = async (req, res) => {
  try {

    const lectures = await LectureSeries.find().sort({ _id: 1 });

    res.render("events/lectureseries", { lectures });

  } catch (error) {
    console.error(error);
    res.send("Error loading Lecture Series");
  }
};

export const addLectureSeries = async (req, res) => {
  try {

    const { heading, description, images } = req.body;

    const newLecture = new LectureSeries({
      heading,
      description,
      images
    });

    await newLecture.save();

    res.redirect("/lecture-series");

  } catch (error) {
    console.error(error);
    res.send("Error adding Lecture Series");
  }
};