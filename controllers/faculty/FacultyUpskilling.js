import FacultyUpskilling from "../../models/faculty/FacultyUpskilling.js";

// Show page
export const getAllFacultyUpskilling = async (req, res) => {
  try {
    // Fetch one upskilling record (or null if none exists)
    const faculties  = await FacultyUpskilling.findOne();

    // Render the page with the data (EJS will handle null case)
    res.render("faculty/FacultyUpskilling", { faculties  });
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
