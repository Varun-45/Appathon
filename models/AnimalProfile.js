import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    userId: String,
    animalName: String,
    animalId: Schema.Types.ObjectId,
    numberOfChilds: Number,
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
    animalGirth: Number,
    weight: Number,
    pregnancyStatus: String,
    lastCalving: Date,
    lastDateOfAutoInsemination: Date,
    lactationNumber: Number,
    currentMilkingStage: {
        type: String,
        enum: ['Milking', 'Dry']
    }

});

export const Animal = mongoose.model('Animal', animalSchema);