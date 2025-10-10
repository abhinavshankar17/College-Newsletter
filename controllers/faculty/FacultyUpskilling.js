import FacultyUpskilling from "../../models/faculty/FacultyUpskilling.js";

// Show all faculty upskilling records
export const getAllFacultyUpskilling = async (req, res) => {
  try {
    const faculties = await FacultyUpskilling.find().lean();
    res.render("faculty/FacultyUpskilling", { faculties });
  } catch (err) {
    console.error("❌ Error fetching Faculty Upskilling:", err);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new faculty upskilling record
export const addFacultyUpskilling = async (req, res) => {
  try {
    const { body, files } = req;

    // Build new faculty object
    const newFaculty = new FacultyUpskilling({
      name: body.name.trim(),
      designation: body.designation?.trim() || "Assistant Professor",
      department: body.department?.trim() || "NWC, SRMIST",
      description: body.description?.trim() || "",
      images: [],
    });

    // Handle uploaded images
    if (files && files.length > 0) {
      files.forEach(file => {
        newFaculty.images.push(file.path || file.filename);
      });
    }

    await newFaculty.save();

    console.log("✅ Faculty Upskilling record added:", newFaculty._id);
    res.redirect("/faculty/Faculty-Upskilling");
  } catch (err) {
    console.error("❌ Error adding Faculty Upskilling:", err);
    res.status(500).render("error", { message: "Server Error" });
  }
};
