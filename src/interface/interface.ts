interface User {
  id: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

interface TokenPayload {
  id: number;
  username: string;
}

interface Login {
  username: string;
  password: string;
}

interface Product {
  name: string;
  amount: string;
}

interface Order {
  products: number[];
}

export {
  User,
  TokenPayload,
  Login,
  Product,
  Order,
};