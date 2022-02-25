import { prisma } from '../../models/connection';

const getAllOrders = async () => {
  const findManyOrders = await prisma.orders.findMany({
    include: { product: { select: { id: true } } },
  });

  const allProducts = findManyOrders.map((order) => ({
    ...order,
    products: order.product.map((data) => data.id),
  }));

  return { code: 200, data: allProducts };
};

export default getAllOrders;