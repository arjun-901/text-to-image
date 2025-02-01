import mongoose from "mongoose"; // Importing the mongoose module

const connectDB = async () => {
    // Listening for the 'connected' event on the mongoose connection
    mongoose.connection.on('connected', () => {
        console.log("Database connected");
    });

    // Connecting to the MongoDB database using the connection string from the environment variable
    await mongoose.connect(`${process.env.MONGODB_URI}/text-to-image`);
};

export default connectDB; // Exporting the connectDB function
