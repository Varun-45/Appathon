import mongoose from "mongoose";
import { StockPosition } from "../models/stock.js";
import { MilkProduction } from "../models/MilkProd.js";

export const getStockPosition = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed in the request parameters

        let stockPosition = await StockPosition.findOne({ userId });

        if (!stockPosition) {
            const totalStockAggregation = await MilkProduction.aggregate([
                { $match: { userId } }, // Filter milk production records by userId
                { $group: { _id: null, totalStock: { $sum: '$milkQuantity' } } }
            ]);

            const totalStock = totalStockAggregation.length > 0 ? totalStockAggregation[0].totalStock : 0;

            stockPosition = new StockPosition({
                userId,
                totalStock,
                soldStock: 0,
                availableStock: totalStock
            });

            await stockPosition.save();
        }

        const totalAvailableStock = stockPosition.totalStock - stockPosition.soldStock;

        res.status(200).json({
            totalStock: stockPosition.totalStock,
            soldStock: stockPosition.soldStock,
            availableStock: totalAvailableStock
        });
    } catch (error) {
        res.status(500).json({ message: 'Error getting stock position', error: error.message });
    }
};


export const updateStockPosition = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { soldMilk } = req.body;

        let stockPosition = await StockPosition.findOne({ userId });

        if (!stockPosition) {
            stockPosition = new StockPosition({ userId });
        }

        stockPosition.soldStock += parseInt(soldMilk)
        stockPosition.availableStock -= stockPosition.totalStock - stockPosition.soldStock;

        await stockPosition.save();

        res.status(200).json({
            totalStock: stockPosition.totalStock,
            soldStock: stockPosition.soldStock,
            availableStock: stockPosition.availableStock
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating stock position', error: error.message });
    }
};
