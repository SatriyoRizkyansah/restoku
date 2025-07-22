import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      return await this.databaseService.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          // Don't return password
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch users');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          email: true,
          // Don't return password
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch user');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      // Check if username already exists
      const existingUser = await this.databaseService.user.findUnique({
        where: { username: createUserDto.username },
      });

      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      // Check if email already exists
      const existingEmail = await this.databaseService.user.findFirst({
        where: { email: createUserDto.email },
      });

      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.databaseService.user.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
          // Don't return password
        },
      });

      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Failed to create user');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      // Check if user exists
      await this.findOne(id);

      // Check if username is being updated and already exists
      if (updateUserDto.username) {
        const existingUser = await this.databaseService.user.findFirst({
          where: {
            username: updateUserDto.username,
            NOT: { id },
          },
        });

        if (existingUser) {
          throw new ConflictException('Username already exists');
        }
      }

      // Check if email is being updated and already exists
      if (updateUserDto.email) {
        const existingEmail = await this.databaseService.user.findFirst({
          where: {
            email: updateUserDto.email,
            NOT: { id },
          },
        });

        if (existingEmail) {
          throw new ConflictException('Email already exists');
        }
      }

      const user = await this.databaseService.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          username: true,
          email: true,
          // Don't return password
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: number) {
    try {
      // Check if user exists
      await this.findOne(id);

      await this.databaseService.user.delete({
        where: { id },
      });

      return { message: `User with ID ${id} has been deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete user');
    }
  }

  // Method for authentication
  async validateUser(username: string, password: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { username },
      });

      // if (user && (await bcrypt.compare(password, user.password))) {
      //   const { password: _, ...result } = user;
      //   return result;
      // }

      if (user && (await password, user.password)) {
        const { password: _, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new BadRequestException('Failed to validate user');
    }
  }

  async findByUsername(username: string) {
    try {
      return await this.databaseService.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          email: true,
          // Don't return password for security
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to find user');
    }
  }
}
