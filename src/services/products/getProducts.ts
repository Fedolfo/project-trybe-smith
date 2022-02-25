import { prisma } from '../../models/connection';

const allProducts = async () => {
  const products = await prisma.products.findMany();
  return { code: 200, data: products };
};

export default allProducts;