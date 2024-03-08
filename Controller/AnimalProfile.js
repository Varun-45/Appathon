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

