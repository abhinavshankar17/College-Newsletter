import InternetOfThings from "../../models/specialization/InternetOfThings.js";

// Show Page
export const getInternetOfThings = async (req, res) => {
  try {
    const data = await InternetOfThings.findOne().lean(); // use .lean() for EJS
    res.render("specialization/internetOfThings", { iotData: data });
  } catch (error) {
    console.error("❌ Error fetching IoT data:", error);
    res.status(500).render("error", { message: "Error fetching Internet of Things data" });
  }
};

// Add or Update Internet of Things Data
export const addInternetOfThings = async (req, res) => {
  try {
    const { body, files } = req;

    // Build IoT data object
    const iotData = {
      description: body.description || "",
      ExpertFacultyAndInfrastructure: body.ExpertFacultyAndInfrastructure || "",
      AcademicAndIndustryIntegration: {
        description: body.AcademicAndIndustryIntegrationDescription || "",
        images: [],
      },
      ResearchExcellenceAndRecognition: body.ResearchExcellenceAndRecognition || "",
      CommunityEngagementAndProfessionalExcellence: body.CommunityEngagementAndProfessionalExcellence || "",
      AlumniEngagementAndGlobalExposure: body.AlumniEngagementAndGlobalExposure || "",
      UpcomingEvents: body.UpcomingEvents || "",
      FacultyAchievements: body.FacultyAchievements || "",
      AwardsAndRewards: body.AwardsAndRewards || "",
      Quote: {
        quote: body.QuoteQuote || "",
        Author: body.QuoteAuthor || ""
      }
    };

    // Handle uploaded images for Academic & Industry Integration
    if (files && files.AcademicImages) {
      const images = Array.isArray(files.AcademicImages) ? files.AcademicImages : [files.AcademicImages];
      iotData.AcademicAndIndustryIntegration.images = images.map(file => file.path || file.filename);
    }

    // Check if a document already exists
    const existing = await InternetOfThings.findOne();
    if (existing) {
      // Update existing document
      await InternetOfThings.updateOne({ _id: existing._id }, { $set: iotData });
      console.log("✅ Internet of Things data updated.");
    } else {
      // Create new document
      const newData = new InternetOfThings(iotData);
      await newData.save();
      console.log("✅ Internet of Things data added.");
    }

    res.redirect("/specialization/internet-of-things");
  } catch (error) {
    console.error("❌ Error adding/updating IoT data:", error);
    res.status(500).render("error", { message: "Error adding/updating Internet of Things data" });
  }
};
