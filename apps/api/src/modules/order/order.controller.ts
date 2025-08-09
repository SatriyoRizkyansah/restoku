import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';

@ApiTags('Orders')
@Controller('orders')
@UseInterceptors(ResponseInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get all orders',
    description:
      'Retrieve a list of all orders with their order items and product details',
  })
  @ApiOkResponse({
    description: 'Orders retrieved successfully',
    type: [OrderDto],
  })
  @ApiBadRequestResponse({
    description: 'Failed to fetch orders',
  })
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('table/:tableNumber')
  @ApiOperation({
    summary: 'Get orders by table number',
    description: 'Retrieve all orders for a specific table',
  })
  @ApiParam({
    name: 'tableNumber',
    description: 'Table number',
    example: 'T01',
  })
  @ApiOkResponse({
    description: 'Orders for table retrieved successfully',
    type: [OrderDto],
  })
  @ApiBadRequestResponse({
    description: 'Failed to fetch orders by table',
  })
  async getOrdersByTable(@Param('tableNumber') tableNumber: string) {
    return this.orderService.getOrdersByTable(tableNumber);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get order by ID',
    description: 'Retrieve a specific order by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID',
    example: 'uuid-string',
  })
  @ApiOkResponse({
    description: 'Order retrieved successfully',
    type: OrderDto,
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to fetch order',
  })
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Create a new order with multiple order items',
  })
  @ApiBody({
    type: CreateOrderDto,
    description: 'Order creation data',
    examples: {
      example1: {
        summary: 'Sample order',
        value: {
          name: 'John Doe',
          table_number: 'T01',
          orders: [
            {
              productId: 1,
              quantity: 2,
              description: 'No chili',
            },
            {
              productId: 2,
              quantity: 1,
              description: 'Extra spicy',
            },
          ],
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Order created successfully',
    type: OrderDto,
  })
  @ApiBadRequestResponse({
    description:
      'Validation failed, product not found, or product not available',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'One or more products not found' },
        error: { type: 'object' },
        timestamp: { type: 'string' },
        path: { type: 'string' },
      },
    },
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Delete order',
    description: 'Delete an order by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID',
    example: 'uuid-string',
  })
  @ApiOkResponse({
    description: 'Order deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Request successful' },
        data: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example:
                'Order with ID uuid-string has been deleted successfully',
            },
          },
        },
        timestamp: { type: 'string' },
        path: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete order',
  })
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
