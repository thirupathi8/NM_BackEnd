import mongoose from "mongoose";

const qaSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    pdfId: {
        type: String,
        ref: 'PDF',
        required: true
    },
    question: [
        {
            textSnippet: {
                type: String,
                required: true
            },
            embedding: {
                type: Array,
                required: true
            }
        }
    ],
    answer: {
        type: String,
        // required: true
    },
    askedAt: {
        type: Date,
        default: Date.now
    }
})

const QA = mongoose.model("QA", qaSchema);

export default QA;