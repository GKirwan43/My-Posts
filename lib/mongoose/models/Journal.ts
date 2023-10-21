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
        type: String,
    },
    description: {
        type: String,
    },
}, {timestamps: true})

export default mongoose.models.Journal || mongoose.model("Journal", journalSchema)