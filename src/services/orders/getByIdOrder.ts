import { prisma } from '../../models/connection';

const getByIdOrder = async (id: number) => {
  const findOrders = await prisma.orders.findUnique({
    where: { id },
    include: { product: { select: { id: true } } } });
  if (!findOrders) return { code: 404, data: { error: 'Order not found' } };

  const productId = {
    ...findOrders,
    products: findOrders.product.map((data) => data.id),
  };

  return { code: 200, data: productId };
};

export default getByIdOrder;