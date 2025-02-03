import express from 'express'; // Importing express framework
import { registerUser, loginUser, userCredit, paymentRazorpay, verifyPayment, createSupport, createReturn, getUserData } from "../controllers/userController.js"; // Importing user controller functions
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router(); // Creating a new router object

// Route for registering a new user
userRouter.post('/register', registerUser);

// Route for logging in an existing user
userRouter.post('/login', loginUser);

// Route for admin login


userRouter.get('/credits',userAuth,userCredit);

userRouter.post('/pay-razor',userAuth,paymentRazorpay);

userRouter.post('/verify-payment', userAuth, verifyPayment);

userRouter.post('/support', userAuth, createSupport);
userRouter.post('/return', userAuth, createReturn);

userRouter.get('/user-data', userAuth, getUserData);

export default userRouter; // Exporting the router to be used in other parts of the application

//localhost:5000/api/user/register

//localhost:5000/api/user/login
