import express from 'express';

const routes = express.Router();
import { saveUser, login } from '../Controller/Auth.js';
import { createAnimalProfile, getAnimalProfilesByUserId } from '../Controller/AnimalProfile.js';
import { calculateMilkProductionForDate, createMilkProductionRecord, getTotalMilkProductionByAnimalId } from '../Controller/MilkProduction.js';
import { getAllQnA, postAnswer, postQuestion } from '../Controller/QnA.js';


routes.post('/signup', saveUser);
routes.post('/login', login);
routes.post('/registerCattle', createAnimalProfile)
routes.get('/getanimals', getAnimalProfilesByUserId)
routes.post('/createrecord', createMilkProductionRecord)
routes.get('/getmilkprodbydate', calculateMilkProductionForDate)
routes.get('/getmilkprodbyId', getTotalMilkProductionByAnimalId)
routes.post('/questionpost', postQuestion)
routes.post('/postAnswer', postAnswer)
routes.get('/getallqna', getAllQnA)
export default routes