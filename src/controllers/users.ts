import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import * as users from '../services/index';

const SERVER_ERROR = 'Server error';

export const addUser: RequestHandler = async (req, res) => {
  try {
    const user = await users.newUser(req.body);

    const jwtConfig = {
      expiresIn: '7d',
    };

    const { id, username } = user;
    const token = jwt.sign({ data: id, username }, process.env.JWT_SECRET as string, jwtConfig);

    res.status(201).json({ token });
  } catch (err: unknown) {
    res.status(500).json({ message: SERVER_ERROR, error: err });
  }
};

export const addLogin: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const login = await users.login({ username, password });

    const findCredentials = login.find((user) =>
      user.username === username || user.password === password);

    if (!findCredentials) {
      return res.status(401).json({ error: 'Username or password invalid' });
    }

    const jwtConfig = {
      expiresIn: '7d',
    };

    const token = jwt.sign({ data: username }, process.env.JWT_SECRET as string, jwtConfig);

    res.status(200).json({ token });
  } catch (err: unknown) {
    res.status(500).json({ message: SERVER_ERROR, erro: err });
  }
};