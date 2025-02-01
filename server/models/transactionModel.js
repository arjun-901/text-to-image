import mongoose from "mongoose"; // Importing the mongoose module

// Defining the user schema
const transactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    plan: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    amountUSD: { // Add USD amount
        type: Number,
        required: true
    },
    credits: { 
        type: Number, 
        required: true 
    },
    payment: { 
        type: Boolean, 
        default: false 
    },
    paymentId: { 
        type: String 
    },
    receipt: { 
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    conversionRate: { // Store conversion rate
        type: Number,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

// Creating the user model based on the schema
const transactionModel = mongoose.model("transactions", transactionSchema); // Exporting the user model

export default transactionModel;
