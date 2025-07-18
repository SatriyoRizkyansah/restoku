import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Prisma } from '../../generated/prisma';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get all product' })
  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return products;
  }
}
