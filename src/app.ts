import express from 'express';

import validateUsers from './middlewares/validationUserJoi';
import validateLogin from './middlewares/validationLoginJoi';
import errorMiddleware from './middlewares/error';
import { addLogin, addUser } from './controllers/users';

const app = express();

app.use(express.json());

app.post('/users', validateUsers, addUser);
app.post('/login', validateLogin, addLogin);

app.use(errorMiddleware);
export default app;
