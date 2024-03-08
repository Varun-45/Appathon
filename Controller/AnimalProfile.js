import { Animal } from "../models/AnimalProfile.js"

export const createAnimalProfile = async (req, res) => {
    try {
        const {
            userId,
            animalId,
            animalType,
            breed,
            animalGender,
            DOB,
            weight,
        } = req.body;

        // Check if an animal with the provided animalId already exists
        const existingAnimal = await Animal.findOne({ animalId });

        if (existingAnimal) {
            return res.status(400).json({ message: 'AnimalId already exists' });
        }

        // Create a new animal profile
        const newAnimal = new Animal({
            userId,
            animalId,
            animalType,
            breed,
            animalGender,
            DOB,
            age: calculateage(DOB), // Assuming calculateAge function is defined elsewhere
            weight
        });

        // Save the new animal profile to the database
        await newAnimal.save();

        res.status(201).json({ message: 'Animal profile created successfully', animal: newAnimal });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


function calculateage(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export const getAnimalProfilesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const animalProfiles = await Animal.find({ userId });

        res.status(200).json({ animalProfiles });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
export const getAnimalIdsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const animalProfiles = await Animal.find({ userId }, 'animalId');
        const animalIds = animalProfiles.map(profile => profile.animalId);
        res.status(200).json(animalIds);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const searchAnimalById = async (req, res) => {
    try {
        const { animalId } = req.body;

        // Search for the animal by animalId
        const animal = await Animal.findOne({ animalId });

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.status(200).json({ animal });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};