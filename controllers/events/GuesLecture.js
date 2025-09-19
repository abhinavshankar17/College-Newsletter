import GuestLectureModel from "../../models/events/GuestLecture.js";

// Get all guest lectures
export const getAllLectures = async (req, res) => {
  try {
    const guestLectures = await GuestLectureModel.find().lean(); // fetch all
    res.render("events/GuestLecture.ejs", { guestLectures });
  } catch (error) {
    console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new lecture
export const addAllLectures = async (req, res) => {
  try {
    const newLecture = new GuestLectureModel(req.body);
    await newLecture.save();
    res.redirect("/GuestLecture");
  } catch (error) {
    console.error("Error adding GuestLecture:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
