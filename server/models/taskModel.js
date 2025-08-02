import mongoose from "mongoose";

const taskShema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
})

const taskModel = mongoose.model.subject || mongoose.model('task', taskShema)

export default taskModel