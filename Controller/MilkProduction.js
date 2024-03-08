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

