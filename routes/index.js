import express from 'express';

const routes = express.Router();
import { saveUser, login } from '../Controller/Auth.js';
import { createAnimalProfile, getAnimalProfilesByUserId } from '../Controller/AnimalProfile.js';
import { createMilkProductionRecord } from '../Controller/MilkProduction.js';


routes.post('/signup', saveUser);
routes.post('/login', login);
routes.post('/registerCattle', createAnimalProfile)
routes.get('/getanimals', getAnimalProfilesByUserId)
routes.post('/createRecord', createMilkProductionRecord)

export default routes