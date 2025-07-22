import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    try {
      return await this.database.order.findMany({
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch orders');
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.database.order.findUnique({
        where: { id },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch order');
    }
  }

  async create(dto: CreateOrderDto) {
    try {
      const { name, table_number, orders } = dto;

      // Validate that all products exist
      const productIds = orders.map((item) => item.productId);
      const products = await this.database.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (products.length !== productIds.length) {
        throw new BadRequestException('One or more products not found');
      }

      // Check if products are available
      const unavailableProducts = products.filter(
        (product) => !product.its_ready,
      );
      if (unavailableProducts.length > 0) {
        throw new BadRequestException(
          `Products not available: ${unavailableProducts.map((p) => p.name).join(', ')}`,
        );
      }

      const tracking_number = `TRK-${Date.now()}`;

      return await this.database.order.create({
        data: {
          name,
          table_number,
          tracking_number,
          orderItems: {
            create: orders.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              description: item.description ?? '',
            })),
          },
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create order');
    }
  }

  async remove(id: string) {
    try {
      // Check if order exists
      await this.findOne(id);

      // Delete order (this will also delete order items due to cascade)
      await this.database.order.delete({
        where: { id },
      });

      return { message: `Order with ID ${id} has been deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete order');
    }
  }

  async getOrdersByTable(tableNumber: string) {
    try {
      return await this.database.order.findMany({
        where: {
          table_number: tableNumber,
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch orders by table');
    }
  }
}
