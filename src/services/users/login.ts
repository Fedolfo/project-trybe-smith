import { Login } from '../../interface/interface';
import { prisma } from '../../models/connection';

const login = async (loginUser: Login) => {
  const users = await prisma.users.findMany({ where: loginUser });

  return { code: 200, data: users };
};

export default login;