import InformationTechnology from "../../models/specialization/InformationTechnology.js";

/**
 * GET /specialization/information-technology
 * Render the Information Technology specialization page
 */
export const getInformationTechnology = async (req, res) => {
  try {
    const data = await InformationTechnology.findOne().lean();

    if (!data) {
      return res.render("specialization/InformationTechnology", { data: {} });
    }

    res.render("specialization/InformationTechnology", { data });
  } catch (err) {
    console.error("Error fetching Information Technology data:", err);
    res.status(500).render("error", {
      message: "Error fetching Information Technology data",
      error: err,
    });
  }
};

/**
 * POST /specialization/information-technology
 * Add a new Information Technology document
 */
export const addInformationTechnology = async (req, res) => {
  try {
    // Extract fields from req.body
    const {
      title,
      description,
      DoctotalCommitteeMeeting,
      phdAwardees,
      images, // expect comma-separated string from form
      researchPublications,
      Workshops,
      quote,
    } = req.body;

    // Prepare images array if provided
    let imagesArray = [];
    if (images && typeof images === "string") {
      imagesArray = images.split(",").map(img => img.trim()).filter(Boolean);
    }

    // Create new document
    const newData = new InformationTechnology({
      title: title || "",
      description: description || "",
      DoctotalCommitteeMeeting: DoctotalCommitteeMeeting || "",
      phdAwardees: phdAwardees || "",
      images: imagesArray,
      researchPublications: researchPublications || "",
      Workshops: Workshops || "",
      quote: quote || "",
    });

    // Save to database
    await newData.save();

    // Redirect to view page
    res.redirect("/specialization/information-technology");
  } catch (err) {
    console.error("Error adding Information Technology data:", err);
    res.status(500).render("error", {
      message: "Error adding Information Technology data",
      error: err,
    });
  }
};
