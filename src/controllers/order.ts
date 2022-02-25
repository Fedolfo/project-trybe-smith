import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Data } from '../interface/interface';
import * as orders from '../services/index';

const SERVER_ERROR = 'Server error';

export const addOrder: RequestHandler = async (req: Data, res) => {
  const { id } = req.username as JwtPayload;
  try {
    const { code, data } = await orders.newOrder(id, req.body);

    res.status(code).json(data);
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR, erro: err });
  }
};

export const findByIdOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const { code, data } = await orders.getByIdOrder(Number(id));
    res.status(code).json(data);
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR, erro: err });
  }
};