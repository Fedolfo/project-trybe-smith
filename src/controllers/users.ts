import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import * as users from '../services/index';

const SERVER_ERROR = 'Server error';

export const addUser: RequestHandler = async (req, res) => {
  try {
    const user = await users.getCreate(req.body);

    const jwtConfig = {
      expiresIn: '7d',
    };

    const { id, username } = user;
    const token = jwt.sign({ data: id, username }, process.env.JWT_SECRET as string, jwtConfig);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR, error: err });
  }
};

export const allUsers = () => {};