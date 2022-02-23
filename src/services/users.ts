import { User } from '../interface/interface';
import { prisma } from '../models/connection';

export const create = async (createUser: User) => {
  const user = await prisma.users.create({
    data: createUser,
  });
  return user;
};

export const allUsers = {};