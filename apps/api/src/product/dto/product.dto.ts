// import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  id: number;
  kode: string;
  name: string;
  price: number;
  its_ready: boolean;
  img: string;
  best_seller: boolean;
}
