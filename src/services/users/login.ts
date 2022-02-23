import { Login } from '../../interface/interface';
import { prisma } from '../../models/connection';

const login = async (loginUser: Login) => {
  const user = await prisma.users.findMany({ where: loginUser });

  return user;
};

export default login;