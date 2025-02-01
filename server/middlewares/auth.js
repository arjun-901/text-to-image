import jwt from 'jsonwebtoken';

// Middleware to authenticate user
const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    // Check if token is missing
    if (!token) {
        return res.json({ success: false, message: 'Not authorized. Login again.' });
    }

    try {
        // Verify the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token has user ID
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id; // Add user ID to request body
        } else {
            return res.json({ success: false, message: 'Not authorized. Login again.' });
        }
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); // Handle token verification error
    }
};

export default userAuth; // Exporting the userAuth middleware function
