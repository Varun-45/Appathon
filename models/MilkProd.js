import mongoose from "mongoose";


const milkProductionSchema = new mongoose.Schema({

    animalIdentificationNumber: {
        type: String,
        required: true
    },
    milkingDate: {
        type: Date,
        required: true
    },
    milkingShift: {
        type: String,
        enum: ['Morning', 'Evening'],
        required: true
    },
    milkQuantity: {
        type: Number,
        required: true
    },
    abnormalMilk: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },

    remarks: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const MilkProduction = mongoose.model('MilkProduction', milkProductionSchema);
