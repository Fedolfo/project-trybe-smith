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

export {
  User,
  TokenPayload,
  Login,
};