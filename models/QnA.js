import mongoose from "mongoose";
const Schema = mongoose.Schema

const qnaSchema = new Schema({
    question: String,
    answer: String,
    qasker: String,
    answerer: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Qna = mongoose.model('QnA', qnaSchema);