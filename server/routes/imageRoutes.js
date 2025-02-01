import express from 'express'; // Importing the express module
import { generateImage } from '../controllers/imageController.js'; // Importing the generateImage function from the image controller
import userAuth from '../middlewares/auth.js'; // Importing the user authentication middleware

const imageRouter = express.Router(); // Creating a new router object

// Defining a POST route to generate an image, using userAuth middleware for authentication
imageRouter.post('/generate-image', userAuth, generateImage);

export default imageRouter; // Exporting the router object
