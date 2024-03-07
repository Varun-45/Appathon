import express from 'express';

const routes = express.Router();
import { saveUser, login } from '../Controller/Auth.js';

routes.post('/signup', saveUser);
routes.post('/login', login);

export default routes