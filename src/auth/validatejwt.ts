import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { prisma } from '../models/connection';
import { Data } from '../interface/interface';

const secret = process.env.JWT_SECRET || 'senhasecreta'; // senha fora do ambiente de varíavel, afins de estudo.

async function findNameUser(id: number, username: string) {
  const user = await prisma.users.findFirst({ where: {
    id,
    username,
  },
  }) || undefined;
  return user;
}

export default async (req: Data, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] }) as JwtPayload;
    const receivedUsername = decoded.data.username;
    const receivedIdUser = decoded.data.id;
    const username = await findNameUser(receivedIdUser, receivedUsername);

    if (username) {
      req.username = username;
    }

    next();
  } catch (err:unknown) {
    return res.status(401).json({ error: 'Invalid token', err });
  }
};
