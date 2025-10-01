import PhdScholar from "../../models/faculty/phScholarSchema.js";

// Get all PhD Scholars
export const getAllPhdScholars = async (req, res) => {
  try {
    const scholars = await PhdScholar.find();
    res.render("faculty/phdScholar", { scholars });
  } catch (error) {
    console.error("❌ Error fetching PhD Scholars:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};

// Add new PhD Scholar
export const addPhdScholar = async (req, res) => {
  try {
    // Build the scholar document dynamically
    const scholarData = {};
    for (let i = 1; i <= 6; i++) {
      const nameKey = `name${i}`;
      const descKey = `description${i}`;

      if (req.body[nameKey] && req.body[nameKey].trim() !== "") {
        scholarData[nameKey] = req.body[nameKey].trim();
      }

      if (req.body[descKey] && req.body[descKey].trim() !== "") {
        scholarData[descKey] = req.body[descKey].trim();
      }
    }

    const newScholar = new PhdScholar(scholarData);
    await newScholar.save();

    console.log("✅ PhD Scholar document added:", newScholar._id);
    res.redirect("/faculty/phd-scholar");
  } catch (error) {
    console.error("❌ Error adding PhD Scholar:", error);
    res.status(500).render("error", { message: "Server Error" });
  }
};
