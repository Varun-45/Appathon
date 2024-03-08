import { Animal } from "../models/AnimalProfile.js"

export const createAnimalProfile = async (req, res) => {
    try {
        const {
            userId,
            animalName,
            numberOfChilds,
            animalType,
            breed,
            animalGender,
            DOB,
            animalGirth,
            weight,
            pregnancyStatus,
            lastCalving,
            lastDateOfAutoInsemination,
            lactationNumber,
            currentMilkingStage
        } = req.body;


        const newAnimal = new Animal({
            userId,
            animalName,
            numberOfChilds,
            animalType,
            breed,
            animalGender,
            DOB,
            age: calculateage(DOB),
            animalGirth,
            weight,
            pregnancyStatus,
            lastCalving,
            lastDateOfAutoInsemination,
            lactationNumber,
            currentMilkingStage
        });

        await newAnimal.save();

        res.status(201).json({ message: 'Animal profile created successfully', animal: newAnimal });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const calculateage = (DOB) => {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const getAnimalProfilesByUserId = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const animalProfiles = await Animal.find({ userId });

        res.status(200).json({ animalProfiles });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
