import { prisma } from '../../models/connection';

const allProducts = async () => {
  const products = await prisma.products.findMany();
  return products;
};

export default allProducts;