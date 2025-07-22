import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Product ID',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Additional description or notes for the order item',
    example: 'Extra spicy',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Customer name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Table number',
    example: 'T01',
  })
  @IsString()
  @IsNotEmpty()
  table_number: string;

  @ApiProperty({
    description: 'Array of order items',
    type: [CreateOrderItemDto],
    example: [
      {
        productId: 1,
        quantity: 2,
        description: 'Extra spicy',
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orders: CreateOrderItemDto[];
}

export class OrderItemDto {
  @ApiProperty({ description: 'Order item ID' })
  id: number;

  @ApiProperty({ description: 'Product ID' })
  productId: number;

  @ApiProperty({ description: 'Order ID' })
  orderId: string;

  @ApiProperty({ description: 'Quantity' })
  quantity: number;

  @ApiProperty({ description: 'Description', required: false })
  description?: string;

  @ApiProperty({ description: 'Product information', required: false })
  product?: {
    id: number;
    name: string;
    price: number;
    img: string;
  };
}

export class OrderDto {
  @ApiProperty({ description: 'Order ID' })
  id: string;

  @ApiProperty({ description: 'Tracking number' })
  tracking_number: string;

  @ApiProperty({ description: 'Customer name' })
  name: string;

  @ApiProperty({ description: 'Table number' })
  table_number: string;

  @ApiProperty({ description: 'Order items', type: [OrderItemDto] })
  orderItems: OrderItemDto[];
}
