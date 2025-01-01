import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    fileURL: {
        type: String,
        required: true
    },
    extractedContent: [
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
    ]
})

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;