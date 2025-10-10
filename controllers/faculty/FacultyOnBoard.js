import FacultyOnBoard from "../../models/faculty/FacultyOnBoard.js";

// Get all faculty on board
export const getAllFacultyOnBoard = async (req, res) => {
  try {
    const faculty = await FacultyOnBoard.find().lean(); // fetch all documents
    res.render("faculty/FacultyOnBoard", { faculty });
  } catch (error) {
    console.error("❌ Error fetching faculty on board:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new faculty on board
export const addFacultyOnBoard = async (req, res) => {
  try {
    const { body, files } = req;

    // Build new faculty member object
    const newFaculty = new FacultyOnBoard({
      name: body.name.trim(),
      designation: body.designation?.trim() || "",
      images: [],
    });

    // Handle uploaded images
    if (files && files.length > 0) {
      files.forEach((file) => {
        newFaculty.images.push(file.path || file.filename);
      });
    }

    await newFaculty.save();

    console.log("✅ New Faculty On Board added:", newFaculty._id);
    res.redirect("/faculty-on-board");
  } catch (error) {
    console.error("❌ Error adding faculty on board:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
