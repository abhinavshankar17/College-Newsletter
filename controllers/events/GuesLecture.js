import GuestLectureModel from "../../models/events/GuestLecture.js";

// ================================
// 📌 Get all Guest Lectures
// ================================
export const getAllLectures = async (req, res) => {
  try {
    const guestLectures = await GuestLectureModel.find().lean();
    res.render("events/GuestLecture.ejs", { guestLectures });
  } catch (error) {
    console.error("Error fetching Guest Lectures:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// ================================
// 📌 Add New Guest Lecture
// ================================
export const addAllLectures = async (req, res) => {
  try {
    const {
      title,
      conveners,
      resourcePerson,
      numberOfRegisteredParticipants,
      eventSummary,
      images
    } = req.body;

    const newLecture = new GuestLectureModel({
      title: title || "",

      // ⭐ Convert conveners.name to array
      conveners: {
        name: Array.isArray(conveners?.name)
          ? conveners.name
          : conveners?.name
          ? [conveners.name]
          : []
      },

      // ⭐ Convert resourcePerson.name to array
      resourcePerson: {
        name: Array.isArray(resourcePerson?.name)
          ? resourcePerson.name
          : resourcePerson?.name
          ? [resourcePerson.name]
          : []
      },

      numberOfRegisteredParticipants:
        Number(numberOfRegisteredParticipants) || 0,

      eventSummary: eventSummary || "",

      // ⭐ Convert images to array
      images: Array.isArray(images) ? images : images ? [images] : []
    });

    await newLecture.save();
    res.redirect("/GuestLecture");
  } catch (error) {
    console.error("Error adding Guest Lecture:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
