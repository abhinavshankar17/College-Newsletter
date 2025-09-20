import FacultyUpskilling from "../../models/faculty/FacultyUpskilling.js";

// Show page
export const getAllFacultyUpskilling = async (req, res) => {
  try {
    // Fetch all upskilling records
    const faculties = await FacultyUpskilling.find();

    // Render the page with the data
    res.render("faculty/FacultyUpskilling", { faculties });
  } catch (err) {
    console.error("Error fetching Faculty Upskilling:", err);
    res.status(500).send("Error fetching Faculty Upskilling data");
  }
};


// Add new document (CRUD - Create)
export const addFacultyUpskilling = async (req, res) => {
  try {
    const newData = new FacultyUpskilling(req.body);
    await newData.save();
    
    // Redirect to the upskilling page to show the newly added data
    res.redirect("/faculty/Faculty-Upskilling");
  } catch (err) {
    console.error("Error adding Faculty Upskilling:", err);
    res.status(500).send("Error adding Faculty Upskilling data");
  }
};
