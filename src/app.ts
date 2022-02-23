import express from 'express';

import validateUsers from './middlewares/validationUserJoi';
import { addUser } from './controllers/users';

const app = express();

app.use(express.json());

app.post('/users', validateUsers, addUser);

export default app;
