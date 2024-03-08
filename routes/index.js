import express from 'express';

const routes = express.Router();
import { saveUser, login } from '../Controller/Auth.js';
import { createAnimalProfile, getAnimalProfilesByUserId, searchAnimalById } from '../Controller/AnimalProfile.js';
import { calculateMilkProductionForDate, createMilkProductionRecord, getMilkProductionLastMonth, getOldProducts, getTotalMilkProductionByAnimalId } from '../Controller/MilkProduction.js';
import { getAllQnA, postAnswer, postQuestion } from '../Controller/QnA.js';
import { getStockPosition, updateStockPosition } from '../Controller/Stock.js';


routes.post('/signup', saveUser);
routes.post('/login', login);
routes.post('/registerCattle', createAnimalProfile)
routes.get('/getanimals/:userId', getAnimalProfilesByUserId)
routes.post('/srchanimal', searchAnimalById)
routes.post('/createrecord/:userId', createMilkProductionRecord)
routes.post('/getmilkprodbydate/:userId', calculateMilkProductionForDate)
routes.post('/getmilkprodbyId/:userId', getTotalMilkProductionByAnimalId)
routes.get('/getQtylastMonth/:userId', getMilkProductionLastMonth)
routes.post('/questionpost', postQuestion)
routes.post('/postAnswer', postAnswer)
routes.get('/getallqna', getAllQnA)
routes.get('/stock/:userId', getStockPosition)
routes.post('/updatestock/:userId', updateStockPosition)
routes.get('/alertprod/:userId', getOldProducts)
export default routes