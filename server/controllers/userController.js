import userModel from "../models/usermodel.js"; // Importing the user model
import adminModel from "../models/adminModel.js"; // Importing the admin model
import bcrypt from 'bcrypt'; // Importing bcrypt for hashing passwords
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for creating tokens
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
import crypto from 'crypto';
import supportModel from "../models/supportModel.js";
import returnModel from "../models/returnModel.js";

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = { name, email, password: hashedPassword };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({ 
            success: true, 
            token, 
            user: { 
                name: user.name,
                credits: user.credits 
            } 
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ success: false, message: 'Server error, please try again' });
    }
};

// Function to login a user
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.json({ success: false, message: 'Please provide all required fields' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ 
                success: true, 
                token, 
                user: { 
                    name: user.name,
                    credits: user.credits 
                } 
            });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Server error, please try again' });
    }
}

// Function to get user credit
const userCredit = async (req, res) => {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        // Send exact credits without default value
        res.json({ 
            success: true, 
            credits: user.credits,
            user: { 
                name: user.name,
                credits: user.credits
            } 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const razorpayInstance = new razorpay({
    key_id: "rzp_test_uVWSFLoVatlJ77",  // Add this from your Razorpay dashboard
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const USD_TO_INR_RATE = 83; // Keep this in sync with frontend

const paymentRazorpay = async (req, res) => {
    try {
        const { planId } = req.body;
        const token = req.headers.token;

        if (!token) {
            return res.json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        let credits, plan, amount;
        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 10;
                amount = 6 * 83;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 70;
                amount = 40 * 83;
                break;
            case 'Business':
                plan = 'Business';
                credits = 600;
                amount = 350 * 83;
                break;
            default:
                return res.json({
                    success: false,
                    message: 'Invalid plan selected'
                });
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `order_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) {
            return res.json({
                success: false,
                message: 'Failed to create order'
            });
        }

        // Store order details in temporary session/cache instead of creating transaction
        // You can use Redis or any other caching mechanism here
        const orderData = {
            userId,
            plan,
            amount,
            amountUSD: amount / 83,
            credits,
            orderId: order.id,
            currency: 'INR',
            conversionRate: 83
        };

        // Store in memory for now (in production, use Redis or similar)
        global.pendingOrders = global.pendingOrders || new Map();
        global.pendingOrders.set(order.id, orderData);

        res.json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            }
        });

    } catch (error) {
        console.error('Payment creation error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to create payment. Please try again.' 
        });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { response } = req.body;
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        // Get the pending order data
        const orderData = global.pendingOrders.get(razorpay_order_id);
        if (!orderData) {
            return res.json({ 
                success: false, 
                message: 'Order not found' 
            });
        }

        // Verify payment signature here if needed
        
        // Create transaction only after successful payment
        const transaction = await transactionModel.create({
            userId: orderData.userId,
            plan: orderData.plan,
            amount: orderData.amount,
            amountUSD: orderData.amountUSD,
            credits: orderData.credits,
            receipt: razorpay_order_id,
            paymentId: razorpay_payment_id,
            currency: orderData.currency,
            conversionRate: orderData.conversionRate,
            payment: true
        });

        // Update user credits
        const user = await userModel.findById(orderData.userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const updatedCredits = user.credits + orderData.credits;
        await userModel.findByIdAndUpdate(
            orderData.userId,
            { credits: updatedCredits },
            { new: true }
        );

        // Remove from pending orders
        global.pendingOrders.delete(razorpay_order_id);

        return res.json({ 
            success: true, 
            message: 'Payment verified successfully',
            credits: updatedCredits,
            transaction: {
                id: transaction._id,
                plan: transaction.plan,
                amountUSD: transaction.amountUSD,
                amountINR: transaction.amount,
                credits: transaction.credits,
                date: transaction.date
            }
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.json({ success: false, message: 'Payment verification failed' });
    }
};

// Add this helper function to generate request ID
const generateRequestId = (prefix) => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
};

const createSupport = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;
        const token = req.headers.token;

        if (!token) {
            return res.json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const requestId = generateRequestId('SUP');
        const support = await supportModel.create({
            requestId,
            fullName,
            email: user.email,
            message,
            userId
        });

        res.json({ 
            success: true, 
            message: 'Support request created successfully',
            requestId: support.requestId
        });

    } catch (error) {
        console.error('Support creation error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to create support request' 
        });
    }
};

const createReturn = async (req, res) => {
    try {
        const { fullName, transactionId, reason } = req.body;
        const token = req.headers.token;

        if (!token) {
            return res.json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const requestId = generateRequestId('RET');
        const returnRequest = await returnModel.create({
            requestId,
            fullName,
            email: user.email,
            transactionId,
            reason,
            userId
        });

        res.json({ 
            success: true, 
            message: 'Return request created successfully',
            requestId: returnRequest.requestId
        });

    } catch (error) {
        console.error('Return creation error:', error);
        res.json({ 
            success: false, 
            message: 'Failed to create return request' 
        });
    }
};

const getUserData = async (req, res) => {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Fetch all related data with detailed transaction info
        const transactions = await transactionModel.find({ userId })
            .select('plan amount amountUSD credits payment paymentId date conversionRate')
            .sort({ date: -1 });

        const supportRequests = await supportModel.find({ userId })
            .sort({ createdAt: -1 });

        const returnRequests = await returnModel.find({ userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            userInfo: {
                name: user.name,
                email: user.email,
                credits: user.credits,
                createdAt: user.createdAt
            },
            transactions,
            supportRequests,
            returnRequests
        });

    } catch (error) {
        console.error('Get user data error:', error);
        res.json({ success: false, message: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hardcoded admin credentials
        const adminEmail = "admin@example.com";
        const adminPassword = "adminpassword";

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET);
            return res.json({ 
                success: true, 
                token, 
                user: { 
                    name: "Admin",
                    role: "admin"
                } 
            });
        } else {
            return res.json({ success: false, message: 'Invalid admin credentials' });
        }

    } catch (error) {
        console.error('Admin login error:', error);
        return res.status(500).json({ success: false, message: 'Server error, please try again' });
    }
};

export { 
    registerUser, 
    loginUser, 
    userCredit, 
    paymentRazorpay, 
    verifyPayment, 
    createSupport, 
    createReturn, 
    getUserData,
    adminLogin // Export the new function
};
