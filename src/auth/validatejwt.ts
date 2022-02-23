import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import { TokenPayload } from '../interface/interface';
// algumas refencias retirado do Gabriel Gaspar, obrigado!!!!
interface DATA extends JwtPayload {
  data: TokenPayload
}

const prisma = new PrismaClient();

async function findNameUser(name: string) {
  const user = await prisma.users.findUnique({ where: {
    username: name,
  },
  }) || undefined;
  return user;
}

const secret = process.env.JWT_SECRET || 'cebola com repolho';

const tokenjwt: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret) as DATA;
    const receivedEmail = decoded.data.username;
    const username = await findNameUser(receivedEmail);

    req.username = username;
    return next();
  } catch (err:unknown) {
    return res.status(401).json({ message: 'Expired or invalid token', error: err });
  }
};

export default tokenjwt;