import { User } from '../../interface/interface';
import { prisma } from '../../models/connection';

const newUser = async (createUser: User) => {
  const user = await prisma.users.create({
    data: createUser,
  });
  return { code: 201, data: user };
};

export default newUser;