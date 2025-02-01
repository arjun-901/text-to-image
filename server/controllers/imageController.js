// imageController.js

import jwt from 'jsonwebtoken';
import axios from "axios"; // Importing axios for HTTP requests
import userModel from "../models/usermodel.js"; // Importing the user model
import FormData from 'form-data'; // Importing form-data for creating form data

// Function to generate an image
export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const token = req.headers.token;

        if (!token) {
            return res.json({ 
                success: false, 
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Check user credits
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Check if credits are less than 1
        if (user.credits < 1) {
            return res.json({ 
                success: false, 
                message: 'No credits left. Please purchase more credits to continue.',
                creditBalance: 0,
                needsCredits: true
            });
        }

        // Generate image using CLIPDROP_API
        const formData = new FormData();
        formData.append('prompt', prompt);

        const response = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer'
            }
        );

        // Convert image buffer to base64
        const base64Image = Buffer.from(response.data).toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

        // Deduct credit and save - ensure it doesn't go below 0
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { credits: Math.max(0, user.credits - 1) } }, // Ensure credits don't go below 0
            { new: true }
        );

        // Check if this was the last credit
        if (updatedUser.credits === 0) {
            return res.json({
                success: true,
                resultImage: imageUrl,
                message: 'This was your last credit. Please purchase more credits to continue.',
                creditBalance: 0,
                needsCredits: true
            });
        }

        res.json({ 
            success: true, 
            resultImage: imageUrl,
            creditBalance: updatedUser.credits
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Export the generateImage function
export default generateImage;
