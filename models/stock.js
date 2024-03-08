import mongoose from "mongoose";

// Define a schema for the stock position data
const stockPositionSchema = new mongoose.Schema({
    userId: String,
    totalStock: {
        type: Number,
        default: 0
    },
    soldStock: {
        type: Number,
        default: 0
    }
});

export const StockPosition = mongoose.model('StockPosition', stockPositionSchema);