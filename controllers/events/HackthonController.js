import Hackathon from "../../models/events/Hackathon.js";

export const getHackathons = async (req, res) => {
  try {

    const hackathons = await Hackathon.find().lean().sort({ _id: 1 });

    res.render("events/Hackthon", { hackathons });

  } catch (error) {
    console.error(error);
    res.send("Error loading Hackathons");
  }
};

export const addHackathon = async (req, res) => {
  try {

    const { title, description, images } = req.body;

    const newHackathon = new Hackathon({
      title,
      description,
      images: Array.isArray(images) ? images : images ? [images] : []
    });

    await newHackathon.save();

    res.redirect("/hackathons");

  } catch (error) {
    console.error(error);
    res.send("Error adding Hackathon");
  }
};