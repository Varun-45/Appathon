import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { User } from "../models/User.js"

export const saveUser = async (req, res) => {
    const { username, otp, phoneNo, address } = req.body;
    try {
        const existingUser = await User.findOne({ phoneNo });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the provided phone number already exists' });
        }

        // Create a new user
        const newUser = new User({ username, otp, phoneNo, address });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const login = async (req, res) => {
    const { phoneNo, otp } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ phoneNo });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Phone number' });
        }
        // Successful login
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}