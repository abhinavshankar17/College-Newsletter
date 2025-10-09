// models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ✅ Use existing model if it exists, otherwise create a new one
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
