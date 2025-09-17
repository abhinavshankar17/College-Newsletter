import OutreachActivityModel from "../../models/events/OutReach.js";

export const getOutreachActivity = async(req,res)=>{
    try {
        const activity = await OutreachActivityModel.findOne();
        res.render("events/OutreachActivity.ejs",{activity});
        
    } catch (error) {
        console.log("The error occurred is: " + error);
    res.status(500).render("error", { message: "Server Error" });
    }
}

export const addOutreachActivity=async(req,res)=>{
    try {
        const newWorkshop = new OutreachActivityModel(req.body);
        await newWorkshop.save();
         res.redirect("/OutreachActivity");
    } catch (error) {
         console.error("Error adding OutreachActivity:", error);
    res.status(500).render("error", { message: "Server Error" });
    }
};