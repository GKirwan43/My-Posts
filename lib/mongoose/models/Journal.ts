import mongoose from "mongoose";

const {Schema} = mongoose;

const journalSchema = new Schema({
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
        required: true,
        type: String,
        minLength: 1,
        maxLength: 50,
    },
    description: {
        type: String,
        maxLength: 500
    },
}, {timestamps: true})

export default mongoose.models.Journal || mongoose.model("Journal", journalSchema)