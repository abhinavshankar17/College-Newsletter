import PhdScholar from "../../models/faculty/phScholarSchema.js";

// GET: Show all PhD Scholars
export const getAllPhdScholars = async (req, res) => {
  try {
    const scholars = await PhdScholar.find();
    res.render("faculty/phdScholar", { scholars });
  } catch (error) {
    console.error("❌ Error fetching PhD Scholars:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// POST: Add new PhD Scholar
export const addPhdScholar = async (req, res) => {
  try {
    const { name, regNo, description } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).render("error", { message: "Name is required" });
    }

    const newScholar = new PhdScholar({
      name: name.trim(),
      regNo: regNo?.trim() || "",
      description: description?.trim() || "",
    });

    await newScholar.save();

    console.log("✅ PhD Scholar added:", newScholar._id);
    res.redirect("/faculty/phd-scholar");
  } catch (error) {
    console.error("❌ Error adding PhD Scholar:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
