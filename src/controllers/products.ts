import { RequestHandler } from 'express';
import * as products from '../services/index';

const SERVER_ERROR = 'Server error';

export const addProduct: RequestHandler = async (req, res) => {
  try {
    const product = await products.newProduct(req.body);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR, erro: err });
  }
};

export const allProducts: RequestHandler = async (req, res) => {
  try {
    const getProducts = await products.allProducts();
    res.status(200).json(getProducts);
  } catch (err) {
    res.status(500).json({ message: SERVER_ERROR, erro: err });
  }
};
