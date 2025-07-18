import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return this.database.order.findMany({
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
  }

  async create(dto: CreateOrderDto) {
    const { name, table_number, orders } = dto;

    const tracking_number = `TRK-${Date.now()}`;

    return this.database.order.create({
      data: {
        name,
        table_number,
        tracking_number,
        orderItems: {
          create: orders.map((item) => ({
            productId: parseInt(item.productId),
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
  }
}
