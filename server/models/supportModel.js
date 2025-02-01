import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
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
    message: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In Progress', 'Resolved']
    }
}, { timestamps: true });

const supportModel = mongoose.model("Support", supportSchema);
export default supportModel; 