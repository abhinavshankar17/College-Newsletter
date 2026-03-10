import StarMoment from "../../models/events/StarMoment.js";


// GET ALL STAR MOMENTS

export const getAllStarMoments = async (req, res) => {

try {

const starMoments = await StarMoment.find().sort({ createdAt: -1 });

res.render("events/starMoments", {
title: "Star Moments",
starMoments
});

} catch (error) {

console.error(error);
res.status(500).send("Server Error");

}

};



// ADD STAR MOMENT

export const addStarMoment = async (req, res) => {

try {

const { title, description } = req.body;

const images = req.files ? req.files.map(file => file.path) : [];

const starMoment = new StarMoment({
title,
description,
images
});

await starMoment.save();

res.redirect("/star-moments");

} catch (error) {

console.error(error);
res.status(500).send("Error adding star moment");

}

};