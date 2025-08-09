import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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
  @Type(() => Number)
  price: number;

  @ApiProperty({ description: 'Product availability status', example: true })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convert from string to boolean
  its_ready: boolean;

  @ApiProperty({
    description: 'Best seller status',
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  best_seller: boolean;

  // Karena img adalah file upload, hapus semua validasi string
  img: any;
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
