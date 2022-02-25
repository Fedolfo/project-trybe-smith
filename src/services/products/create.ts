import { Product } from '../../interface/interface';
import { prisma } from '../../models/connection';

const newProduct = async (createProduct: Product) => {
  const product = await prisma.products.create({
    data: createProduct,
  });

  return { code: 201, data: { item: product } };
};

export default newProduct;