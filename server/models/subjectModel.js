import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    resources: [resourceSchema],
})

const subjectModel = mongoose.model.subject || mongoose.model('subject', subjectSchema)

export default subjectModel