import AlumniModel from "../../models/events/AlumniActivities.js";

export const getAllAlumniActivities= async(req,res)=>{
    try {
        const AlumniActivities = await AlumniModel.findOne();
        res.render("events/AlumniActivities.ejs",{AlumniActivities});
        
    } catch (error) {
        console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
    }
}

export const addAllAlumniActivities=async(req,res)=>{
    try {
        const AlumniActivities = new AlumniModel(req.body);
        await AlumniActivities.save();
         res.redirect("/Workshops");
    } catch (error) {
         console.error("Error adding AlumniActivities:", error);
    res.status(500).render("error", { message: "Server Error" });
    }
};