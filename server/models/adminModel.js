import mongoose from "mongoose"; // Importing the mongoose module

// Defining the admin schema
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Email field is a required string and must be unique
    password: { type: String, required: true } // Password field is a required string
}, { timestamps: true });

// Creating the admin model based on the schema
const adminModel = mongoose.models.Admin || mongoose.model('Admin', adminSchema); // Ensuring that the model is not recreated if it already exists

export default adminModel; // Exporting the admin model
