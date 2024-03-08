import { MilkProduction } from "../models/MilkProd.js"


export const createMilkProductionRecord = async (req, res) => {
    try {
        const {
            animalType,
            animalIdentificationNumber,
            milkingDate,
            milkingShift,
            milkQuantity,
            abnormalMilk,
            remarks
        } = req.body;

        const newMilkProductionRecord = new MilkProduction({
            animalType,
            animalIdentificationNumber,
            milkingDate,
            milkingShift,
            milkQuantity,
            abnormalMilk,
            remarks
        });

        await newMilkProductionRecord.save();

        res.status(201).json({ message: 'Milk production record created successfully', milkProductionRecord: newMilkProductionRecord });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const calculateMilkProductionForDate = async (req, res) => {
    try {
        const { date } = req.body;

        if (!date) {
            return res.status(400).json({ message: 'Date parameter is required' });
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const milkProductionRecords = await MilkProduction.find({
            milkingDate: { $gte: startOfDay, $lte: endOfDay }
        });

        let totalMilkQuantity = 0;
        for (const record of milkProductionRecords) {
            totalMilkQuantity += record.milkQuantity;
        }

        res.status(200).json({ date, totalMilkQuantity });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating milk production for date', error: error.message });
    }
};