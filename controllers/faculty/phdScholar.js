import PhdScholar from "../../models/faculty/phScholarSchema.js";

// GET all scholars
export const getAllPhdScholars = async (req, res) => {
  try {
    const scholars = await PhdScholar.find().lean();

    res.render("faculty/phdScholar", { scholars });
  } catch (error) {
    console.error("❌ Error fetching PhD Scholars:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// ADD new scholar
export const addPhdScholar = async (req, res) => {
  try {

    const {
      name,
      regNo,
      description,
      mode,
      supervisor,
      completionDate,
      images
    } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).render("error", { message: "Name is required" });
    }

    const newScholar = new PhdScholar({
      name: name.trim(),
      regNo: regNo?.trim() || "",
      description: description?.trim() || "",
      mode: mode?.trim() || "",
      supervisor: supervisor?.trim() || "",
      completionDate: completionDate || null,
      images: images ? (Array.isArray(images) ? images : [images]) : []
    });

    await newScholar.save();

    console.log("✅ PhD Scholar added:", newScholar._id);

    res.redirect("/faculty/phd-scholar");

  } catch (error) {
    console.error("❌ Error adding PhD Scholar:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};