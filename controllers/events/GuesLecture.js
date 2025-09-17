import GuestLectureModel from "../../models/events/GuestLecture.js";

//get all the lectures
export const getAllLectures = async(req,res)=>{
 try {
    const guestLecture = await GuestLectureModel.findOne();
    res.render("events/GuestLecture.ejs",{guestLecture});

 } catch (error) {
    console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
 }
};

export const addAllLectures=async(req,res)=>{
    try {
        const newLecture = new GuestLectureModel(req.body);
        await newLecture.save();
         res.redirect("/GuestLecture");
    } catch (error) {
         console.error("Error adding GuestLecture:", error);
    res.status(500).render("error", { message: "Server Error" });
    }
};