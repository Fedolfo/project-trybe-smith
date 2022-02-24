import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../models/connection';
import { TokenPayload } from '../interface/interface';
// algumas refencias retirado do Gabriel Gaspar, obrigado!!!!
interface DATA extends JwtPayload {
  data: TokenPayload
}

const secret = process.env.JWT_SECRET || 'senhasecreta'; // senha fora do ambiente de varíavel, afins de estudo.

async function findNameUser(id: number, name: string) {
  const user = await prisma.users.findUnique({ where: {
    id,
    username: name,
  },
  }) || undefined;
  return user;
}
export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] }) as DATA;
    const receivedUsername = decoded.data.username;
    const receivedIdUser = decoded.data.id;
    const username = await findNameUser(receivedIdUser, receivedUsername);

    req.username = username;

    return next();
  } catch (err:unknown) {
    return res.status(401).json({ message: 'Expired or invalid token', error: err });
  }
};
