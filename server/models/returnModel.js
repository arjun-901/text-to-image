import mongoose from "mongoose";

const returnSchema = new mongoose.Schema({
    requestId: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    transactionId: {
        type: String,
        required: true
    },
    reason: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Completed']
    }
}, { timestamps: true });

const returnModel = mongoose.model("Return", returnSchema);
export default returnModel; 