import { RequestHandler } from 'express';
import * as products from '../services/index';

const SERVER_ERROR = 'Server error';

export const addProduct: RequestHandler = async (req, res) => {
  try {
    const { code, data } = await products.newProduct(req.body);

    res.status(code).json(data);
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR, erro: err });
  }
};

export const allProducts: RequestHandler = async (req, res) => {
  try {
    const { code, data } = await products.allProducts();
    res.status(code).json(data);
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR, erro: err });
  }
};
