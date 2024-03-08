import { Qna } from "../models/QnA.js";
import { User } from "../models/User.js";

export const postQuestion = async (req, res) => {
    try {
        const { question, qasker } = req.body;
        const newQnA = new Qna({ question, qasker, answer: "", answerer: "" });
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

        // Fetch documents from User model containing phoneNo and username
        const qaskerUsernames = await User.find({}, 'phoneNo username');

        // Create a map of phoneNo and username for qasker
        const qaskerUsernameMap = {};
        qaskerUsernames.forEach(user => {
            qaskerUsernameMap[user.phoneNo] = user.username;
        });

        // Create a map of phoneNo and username for answerer
        const answererUsernames = await User.find({}, 'phoneNo username');
        const answererUsernameMap = {};
        answererUsernames.forEach(user => {
            answererUsernameMap[user.phoneNo] = user.username;
        });

        // Replace qasker and answerer with username in Q&A pairs
        const updatedQnA = allQnA.map(qna => {
            const qasker = qaskerUsernameMap[qna.qasker];
            const answerer = answererUsernameMap[qna.answerer];
            return { ...qna.toObject(), qasker: qasker || null, answerer: answerer || null };
        });

        res.status(200).json({ qna: updatedQnA });
    } catch (error) {
        res.status(500).json({ message: 'Error getting Q&A pairs', error: error.message });
    }
};
