import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Product code', example: 'P001' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Product name', example: 'Nasi Goreng' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product price in IDR', example: 25000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Product availability status', example: true })
  @IsBoolean()
  its_ready: boolean;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/nasi-goreng.jpg',
  })
  @IsString()
  @IsOptional()
  img: string;

  @ApiProperty({ description: 'Best seller status', example: false })
  @IsBoolean()
  best_seller: boolean;
}

export class CreateProductDto {
  @ApiProperty({ description: 'Product code', example: 'P001' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Product name', example: 'Nasi Goreng' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product price in IDR', example: 25000 })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Product availability status',
    example: true,
    default: true,
  })
  @IsBoolean()
  its_ready: boolean = true;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/nasi-goreng.jpg',
  })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({
    description: 'Best seller status',
    example: false,
    default: false,
  })
  @IsBoolean()
  best_seller: boolean = false;
}

export class UpdateProductDto {
  @ApiProperty({
    description: 'Product code',
    example: 'P001',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Nasi Goreng',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Product price in IDR',
    example: 25000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Product availability status',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  its_ready?: boolean;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/nasi-goreng.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty({
    description: 'Best seller status',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  best_seller?: boolean;
}
