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

async function findNameUser(id: number, name: string) {
  const user = await prisma.users.findUnique({ where: {
    id,
    username: name,
  },
  }) || undefined;
  return user;
}

const tokenjwt: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DATA;
    const receivedUsername = decoded.data.username;
    const receivedIdUser = decoded.data.id;
    const username = await findNameUser(receivedIdUser, receivedUsername);

    req.username = username;
    return next();
  } catch (err:unknown) {
    return res.status(401).json({ message: 'Expired or invalid token', error: err });
  }
};

export default tokenjwt;