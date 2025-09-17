import WorkshopModel from "../../models/events/WorkshopModel.js";

export const getAllWorkshop = async(req,res)=>{
    try {
        const workshop = await WorkshopModel.findOne();
        res.render("events/Workshops.ejs",{workshop});
        
    } catch (error) {
        console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
    }
}

export const addAllWorkshops=async(req,res)=>{
    try {
        const newWorkshop = new WorkshopModel(req.body);
        await newWorkshop.save();
         res.redirect("/Workshops");
    } catch (error) {
         console.error("Error adding Workshops:", error);
    res.status(500).render("error", { message: "Server Error" });
    }
};