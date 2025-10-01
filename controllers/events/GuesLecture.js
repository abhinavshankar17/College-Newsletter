import GuestLectureModel from "../../models/events/GuestLecture.js";

// Get all guest lectures
export const getAllLectures = async (req, res) => {
  try {
    const guestLectures = await GuestLectureModel.find().lean(); // fetch all
    res.render("events/GuestLecture.ejs", { guestLectures  });
  } catch (error) {
    console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new lecture
export const addAllLectures = async (req, res) => {
  try {
const { title, conveners, resourcePerson, numberOfRegisteredParticipants, tracks, prizes, venue, registration, eventSummary, images } = req.body;

const newLecture = new GuestLectureModel({
  title,
  conveners,
  resourcePerson,
  numberOfRegisteredParticipants: numberOfRegisteredParticipants || 0,
  tracks,
  prizes,
  venue,
  registration,
  eventSummary,
  images: images || []
});

    await newLecture.save();
    res.redirect("/GuestLecture");
  } catch (error) {
    console.error("Error adding GuestLecture:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
