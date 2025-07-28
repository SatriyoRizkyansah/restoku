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
  UploadedFile,
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
  ApiConsumes,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

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
    type: [CreateProductDto],
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
    const products = await this.productService.findAll();
    const host = process.env.HOST_URL || 'http://localhost:3000';

    return products.map((product) => ({
      ...product,
      img: product.img ? `${host}/uploads/${product.img}` : null,
    }));
  }

  @Get('available')
  @ApiOperation({
    summary: 'Get available products',
    description:
      'Retrieve all products that are currently available (its_ready = true), sorted by best sellers first',
  })
  @ApiOkResponse({
    description: 'Available products retrieved successfully',
    type: [CreateProductDto],
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
    type: [CreateProductDto],
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
    type: CreateProductDto,
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
  @ApiOperation({ summary: 'Create new product with image upload' })
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `product-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product data with image',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'string', example: 'P001' },
        name: { type: 'string', example: 'Nasi Goreng Spesial' },
        price: { type: 'number', example: 25000 },
        its_ready: { type: 'boolean', example: true },
        best_seller: { type: 'boolean', example: false },
        img: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
  ) {
    const imageUrl = `${file.filename}`;
    return this.productService.create({ ...body, img: imageUrl });
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
    type: CreateProductDto,
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
    type: CreateProductDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or product with code already exists',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: CreateProductDto,
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
