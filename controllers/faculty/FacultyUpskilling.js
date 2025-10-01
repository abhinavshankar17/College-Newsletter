import FacultyUpskilling from "../../models/faculty/FacultyUpskilling.js";

// Show all faculty upskilling records
export const getAllFacultyUpskilling = async (req, res) => {
  try {
    const faculties = await FacultyUpskilling.find();
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

    // Build faculty1..faculty4 dynamically
    const facultyData = {};
    for (let i = 1; i <= 5; i++) {
      const nameKey = `name${i}`;
      const desigKey = `designation${i}`;
      const deptKey = `department${i}`;
      const descKey = `description${i}`;
      const imageKey = `image${i}`; // multer field name

      const facultyMember = {};

      if (body[nameKey] && body[nameKey].trim() !== "") {
        facultyMember.name = body[nameKey].trim();
      }
      if (body[desigKey] && body[desigKey].trim() !== "") {
        facultyMember.designation = body[desigKey].trim();
      }
      if (body[deptKey] && body[deptKey].trim() !== "") {
        facultyMember.department = body[deptKey].trim();
      }
      if (body[descKey] && body[descKey].trim() !== "") {
        facultyMember.description = body[descKey].trim();
      }

      // Handle images (single or multiple)
      facultyMember.images = [];
      if (files) {
        const relevantFiles = files.filter(f => f.fieldname === imageKey);
        relevantFiles.forEach(file => {
          facultyMember.images.push(file.path || file.filename);
        });
      }

      // Assign only if there’s some data
      if (facultyMember.name || facultyMember.images.length > 0) {
        facultyData[`faculty${i}`] = facultyMember;
      }
    }

    const newRecord = new FacultyUpskilling(facultyData);
    await newRecord.save();

    console.log("✅ Faculty Upskilling record added:", newRecord._id);
    res.redirect("/faculty/Faculty-Upskilling");
  } catch (err) {
    console.error("❌ Error adding Faculty Upskilling:", err);
    res.status(500).render("error", { message: "Server Error" });
  }
};
