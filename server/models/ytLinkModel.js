import mongoose, { mongo } from "mongoose";

const youtubeLinkSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
})

const youtubeLinkModel = mongoose.model.ytlink || mongoose.model('ytlink', youtubeLinkSchema)

export default youtubeLinkModel