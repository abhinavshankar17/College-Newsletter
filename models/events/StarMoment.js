import mongoose from "mongoose";

const starMomentSchema = new mongoose.Schema({

title: {
type: String,
required: true
},

description: {
type: String,
required: true
},

images: [
{
type: String
}
],

createdAt: {
type: Date,
default: Date.now
}

});

export default mongoose.model("StarMoment", starMomentSchema);