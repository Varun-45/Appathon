import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    userId: String,
    animalId: String,
    animalType: {
        type: String,
        enum: ['Cow', 'Buffalo']
    },
    breed: String,
    animalGender: {
        type: String,
        enum: ['Male', 'Female']
    },
    DOB: Date,
    age: Number,
    weight: Number

});

export const Animal = mongoose.model('Animal', animalSchema);