import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  // @ApiResponse({ status: 200, description: 'List of all orders' })
  @ApiOperation({ summary: 'Get all orders' })
  @ApiOkResponse({
    description: 'List of all orders with their order items',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          table_number: { type: 'string' },
          orderItems: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                quantity: { type: 'number' },
                description: { type: 'string' },
                product: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    img: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async findAll() {
    return this.orderService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({
    type: CreateOrderDto,
    examples: {
      default: {
        summary: 'Contoh order sederhana',
        value: {
          name: 'Satriyo',
          table_number: '12',
          orders: [
            {
              productId: '1',
              quantity: 2,
              description: 'Tanpa sambal',
            },
            {
              productId: '3',
              quantity: 1,
              description: 'Extra pedas',
            },
          ],
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'The order has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        table_number: { type: 'string' },
        orderItems: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              quantity: { type: 'number' },
              description: { type: 'string' },
              product: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  img: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  })
  async create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}
