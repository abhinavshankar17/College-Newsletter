import InternetOfThings from "../../models/specialization/InternetOfThings.js";

// Show Page
export const getInternetOfThings = async (req, res) => {
  try {
    const data = await InternetOfThings.findOne(); // fetch one document

    res.render("specialization/internetOfThings", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching Internet of Things data");
  }
};

export const addInternetOfThings = async (req, res) => {
  try {
    const newData = new InternetOfThings(req.body);
    await newData.save();
    res.redirect("/specialization/internet-of-things");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding Internet of Things data");
  }
}