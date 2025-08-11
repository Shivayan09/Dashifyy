import mongoose from "mongoose";

const taskShema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const taskModel = mongoose.model.subject || mongoose.model('task', taskShema)

export default taskModel