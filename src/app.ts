import express from 'express';

import validateUsers from './middlewares/validationUserJoi';
import validateLogin from './middlewares/validationLoginJoi';
import errorMiddleware from './middlewares/error';
import { addLogin, addUser, addProduct, allProducts } from './controllers';
import auth from './auth/validatejwt'; // ERROR
import validationProductJoi from './middlewares/validationProductJoi';

const app = express();

app.use(express.json());

app.post('/users', validateUsers, addUser);
app.post('/login', validateLogin, addLogin);

app.use(auth);
app.post('/products', validationProductJoi, addProduct);
app.get('/products', allProducts);

app.use(errorMiddleware);
export default app;
