import { Qna } from "../models/QnA.js";

export const postQuestion = async (req, res) => {
    try {
        const { question, qasker } = req.body;
        const newQnA = new Qna({ question, qasker });
        await newQnA.save();
        res.status(201).json({ message: 'Question posted successfully', qna: newQnA });
    } catch (error) {
        res.status(500).json({ message: 'Error posting Question', error: error.message });
    }
};


export const postAnswer = async (req, res) => {
    try {
        const { answer, answerer, questionId } = req.body;

        const question = await Qna.findByIdAndUpdate(questionId, { answer, answerer }, { new: true });

        if (!question) {
            return res.status(400).json({ message: 'Question not found' });
        }

        res.status(201).json({ message: 'Answer posted successfully', question });
    } catch (error) {
        res.status(500).json({ message: 'Error posting Answer', error: error.message });
    }
};




export const getAllQnA = async (req, res) => {
    try {
        const allQnA = await Qna.find();

        res.status(200).json({ qna: allQnA });
    } catch (error) {
        res.status(500).json({ message: 'Error getting Q&A pairs', error: error.message });
    }
};

