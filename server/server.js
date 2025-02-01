import express from 'express'; // Importing the express module
import cors from 'cors'; // Importing the cors module
import 'dotenv/config'; // Importing and configuring dotenv to manage environment variables

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 5000; // Defining the port number, using an environment variable or defaulting to 5000
const app = express(); // Creating an instance of express

app.use(express.json()); // Middleware to parse JSON bodies in requests
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing (CORS)

// Wrapping server setup in an async function to use await
const startServer = async () => {
    await connectDB(); // Connecting to the database

    app.use('/api/user', userRouter);
    app.use('/api/image',imageRouter);
     // Setting up user routes
    app.get('/', (req, res) => res.send("API Working Fine")); // Setting up a route to respond with "API Working" when accessing the root URL

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starting the server and logging the port number
};

startServer(); // Calling the async function to start the server
