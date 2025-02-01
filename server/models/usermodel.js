import mongoose from "mongoose"; // Importing the mongoose module

// Defining the user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Specifying that the name field is a required string
    email: { type: String, required: true, unique: true }, // Email field is a required string and must be unique
    password: { type: String, required: true }, // Password field is a required string
    credits: { type: Number, default: 5, min: 0 } // Added min: 0 to prevent negative values
}, { timestamps: true });

// Creating the user model based on the schema
const userModel = mongoose.models.User || mongoose.model('User', userSchema); // Ensuring that the model is not recreated if it already exists

export default userModel; // Exporting the user model
