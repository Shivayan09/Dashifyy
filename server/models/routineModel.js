import mongoose from "mongoose";

const routineSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    start: {
        type: Number,
        required: true,
    },
    end: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
})

const routineModel = mongoose.model.routine || mongoose.model('routine', routineSchema)

export default routineModel