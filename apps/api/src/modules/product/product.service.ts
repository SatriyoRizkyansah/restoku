import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Prisma } from '../../../generated/prisma';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      return await this.databaseService.product.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch products');
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.databaseService.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch product');
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      // Check if product code already exists
      const existingProduct = await this.databaseService.product.findUnique({
        where: { code: createProductDto.code },
      });

      if (existingProduct) {
        throw new BadRequestException('Product with this code already exists');
      }

      return await this.databaseService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create product');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      // Check if product exists
      await this.findOne(id);

      // Check if code is being updated and if it already exists
      if (updateProductDto.code) {
        const existingProduct = await this.databaseService.product.findUnique({
          where: {
            code: updateProductDto.code,
            NOT: { id },
          },
        });

        if (existingProduct) {
          throw new BadRequestException(
            'Product with this code already exists',
          );
        }
      }

      return await this.databaseService.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update product');
    }
  }

  async remove(id: number) {
    try {
      // Check if product exists
      await this.findOne(id);

      await this.databaseService.product.delete({
        where: { id },
      });

      return { message: `Product with ID ${id} has been deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete product');
    }
  }

  async findAvailable() {
    try {
      return await this.databaseService.product.findMany({
        where: {
          its_ready: true,
        },
        orderBy: {
          best_seller: 'desc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch available products');
    }
  }

  async findBestSellers() {
    try {
      return await this.databaseService.product.findMany({
        where: {
          best_seller: true,
          its_ready: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch best seller products');
    }
  }
}
