import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    otp: String,
    phoneNo: String,
    address: String
});
export const User = mongoose.model('User', userSchema);