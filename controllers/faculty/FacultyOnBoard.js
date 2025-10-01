import FacultyOnBoard from "../../models/faculty/FacultyOnBoard.js";

// Get all faculty on board
export const getAllFacultyOnBoard = async (req, res) => {
  try {
    const faculty = await FacultyOnBoard.find(); // fetch all documents
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

    // Initialize object to match your schema: faculty1 to faculty10
    const facultyData = {};

    for (let i = 1; i <= 10; i++) {
      const nameKey = `name${i}`;
      const desigKey = `designation${i}`;
      const imagesKey = `images${i}`; // multer field name per faculty

      // Build individual faculty object only if any data is provided
      const facultyMember = {};

      // Name & designation
      if (body[nameKey] && body[nameKey].trim() !== "") {
        facultyMember[nameKey] = body[nameKey].trim();
      }
      if (body[desigKey] && body[desigKey].trim() !== "") {
        facultyMember[desigKey] = body[desigKey].trim();
      }

      // Images: handle single or multiple files safely
      facultyMember.images = [];
      if (files && files.length > 0) {
        const relevantFile = files.find(f => f.fieldname === imagesKey);
        if (relevantFile) {
          // push single image as array (matches schema)
          facultyMember.images.push(relevantFile.path || relevantFile.filename);
        }
      }

      // Only assign if there's at least some data
      if (
        Object.keys(facultyMember).length > 1 || // includes images array
        (facultyMember.images && facultyMember.images.length > 0)
      ) {
        facultyData[`faculty${i}`] = facultyMember;
      }
    }

    // Save new faculty document
    const newFaculty = new FacultyOnBoard(facultyData);
    await newFaculty.save();

    console.log("✅ New Faculty On Board added:", newFaculty._id);
    res.redirect("/faculty-on-board");
  } catch (error) {
    console.error("❌ Error adding faculty on board:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
