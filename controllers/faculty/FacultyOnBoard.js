import FacultyOnBoard from "../../models/faculty/FacultyOnBoard.js";
export const getAllFacultyOnBoard = async (req, res) => {
    try {
        const faculty = await FacultyOnBoard.findOne();
        res.render("faculty/FacultyOnBoard", {faculty});
    } catch (error) {
        console.error("Error fetching faculty on board:", error);
        res.status(500).render("error", { message: "Server Error" });
    }
};

// Add new faculty on board (CRUD - Create)
export const addFacultyOnBoard = async (req, res) => {
    try {
        const newFaculty = new FacultyOnBoard(req.body);
        await newFaculty.save();
        res.redirect("/faculty-on-board");
    } catch (error) {
        console.error("Error adding faculty on board:", error);
        res.status(500).render("error", { message: "Server Error" });
    }
};
