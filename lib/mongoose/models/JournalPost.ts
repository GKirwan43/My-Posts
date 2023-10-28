import mongoose from "mongoose";

const {Schema} = mongoose;

const journalPostSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    uid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50,
    },
    post: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export default mongoose.models.JournalPost || mongoose.model("JournalPost", journalPostSchema)