import { MilkProduction } from "../models/MilkProd.js"


export const createMilkProductionRecord = async (req, res) => {
    try {
        const {
            animalIdentificationNumber,
            milkingShift,
            milkQuantity,
            abnormalMilk,
            remarks
        } = req.body;

        const newMilkProductionRecord = new MilkProduction({
            animalIdentificationNumber,
            milkingDate: Date.now(),
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

export const getTotalMilkProductionByAnimalId = async (req, res) => {
    try {
        const { animalId } = req.body;

        if (!animalId) {
            return res.status(400).json({ message: 'AnimalId parameter is required' });
        }

        const milkProductionRecords = await MilkProduction.find({ animalIdentificationNumber: animalId });

        let totalMilkQuantity = 0;
        for (const record of milkProductionRecords) {
            totalMilkQuantity += record.milkQuantity;
        }
        res.status(200).json({ animalId, totalMilkQuantity });
    } catch (error) {
        res.status(500).json({ message: 'Error getting total milk production by animalId', error: error.message });
    }
};