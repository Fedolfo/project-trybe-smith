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

export {
  User,
  TokenPayload,
};