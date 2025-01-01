import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String
    },
    profileImage: {
        type: String
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;