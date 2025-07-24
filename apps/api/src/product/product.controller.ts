import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import {
  ProductDto,
  CreateProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';

@ApiTags('Products')
@Controller('products')
// @UseInterceptors(ResponseInterceptor)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Retrieve a list of all products in the system',
  })
  @ApiOkResponse({
    description: 'Products retrieved successfully',
    type: [ProductDto],
  })
  @ApiBadRequestResponse({
    description: 'Failed to fetch products',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Failed to fetch products' },
        error: { type: 'object' },
        timestamp: { type: 'string' },
        path: { type: 'string' },
      },
    },
  })
  async findAll() {
    return this.productService.findAll();
  }

  @Get('available')
  @ApiOperation({
    summary: 'Get available products',
    description:
      'Retrieve all products that are currently available (its_ready = true), sorted by best sellers first',
  })
  @ApiOkResponse({
    description: 'Available products retrieved successfully',
    type: [ProductDto],
  })
  async findAvailable() {
    return this.productService.findAvailable();
  }

  @Get('best-sellers')
  @ApiOperation({
    summary: 'Get best seller products',
    description: 'Retrieve all products marked as best sellers and available',
  })
  @ApiOkResponse({
    description: 'Best seller products retrieved successfully',
    type: [ProductDto],
  })
  async findBestSellers() {
    return this.productService.findBestSellers();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Retrieve a specific product by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Product retrieved successfully',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Product with ID 1 not found' },
        error: { type: 'object' },
        timestamp: { type: 'string' },
        path: { type: 'string' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid product ID or failed to fetch product',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new product',
    description: 'Create a new product with the provided information',
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'Product creation data',
    examples: {
      example1: {
        summary: 'Nasi Goreng',
        value: {
          code: 'P001',
          name: 'Nasi Goreng Spesial',
          price: 25000,
          its_ready: true,
          img: 'https://example.com/nasi-goreng.jpg',
          best_seller: false,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Product created successfully',
    type: ProductDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or product with code already exists',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: {
          type: 'string',
          example: 'Product with this code already exists',
        },
        error: { type: 'object' },
        timestamp: { type: 'string' },
        path: { type: 'string' },
      },
    },
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Update an existing product with the provided information',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Product update data',
    examples: {
      example1: {
        summary: 'Update price',
        value: {
          price: 27000,
        },
      },
      example2: {
        summary: 'Mark as unavailable',
        value: {
          its_ready: false,
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Product updated successfully',
    type: ProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or product with code already exists',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete a product by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    type: 'number',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Product deleted successfully',
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
              example: 'Product with ID 1 has been deleted successfully',
            },
          },
        },
        timestamp: { type: 'string' },
        path: { type: 'string' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete product',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
