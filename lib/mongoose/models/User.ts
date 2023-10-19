import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    settings: {
        darkMode: {
            type: Boolean,
            default: false,
        }
    }
}, {timestamps: true})

export default mongoose.models.User || mongoose.model("User", userSchema)