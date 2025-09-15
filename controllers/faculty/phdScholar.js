import PhdScholar from "../../models/faculty/phScholarSchema.js";

// Get all PhD Scholars
export const getAllPhdScholars = async(req,res)=>{
    try {
        const scholars = await PhdScholar.find();
        res.render("faculty/phdScholar", {scholars});
    } catch (error) {
        console.error("Error fetching PhD Scholars:", error);
        res.status(500).render("error", { message: "Server Error" });
        
    }
}

export const addPhdScholar = async(req,res)=>{
    try {
        
        const newScholar = new PhdScholar(req.body);
        await newScholar.save();
        res.redirect("/faculty/phd-scholar");
    } catch (error) {
        console.error("Error adding PhD Scholar:", error);
        res.status(500).render("error", { message: "Server Error" });
        
    }
}