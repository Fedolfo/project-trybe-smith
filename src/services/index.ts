import newUser from './users/create';
import login from './users/login';

import newProduct from './products/create';
import allProducts from './products/getProducts';

import newOrder from './orders/create';
import getByIdOrder from './orders/getByIdOrder';
import getAllOrders from './orders/getAllOrders';

export {
  // users
  newUser,
  login,
  // products
  newProduct,
  allProducts,
  // orders
  newOrder,
  getByIdOrder,
  getAllOrders,
};