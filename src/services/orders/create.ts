import { Order } from '../../interface/interface';
import { prisma } from '../../models/connection';

const newOrder = async (userId: number, { products }: Order) => {
  await prisma.$transaction(async (transaction) => {
    const { id: orderId } = await transaction.orders.create({
      data: { userId },
    });

    await Promise.all(products.map((id) => transaction.products.update({
      where: { id },
      data: { orderId },
    })));
  });

  return { code: 201, data: { order: { userId, products } } };
};

export default newOrder;