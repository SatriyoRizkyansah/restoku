import { IsString, IsArray, ValidateNested, IsNumber, IsOptional, } from 'class-validator';
import { Type } from 'class-transformer';
class CreateOrderItemDto {
    @IsString()
    productId;
    @IsNumber()
    quantity;
    @IsOptional()
    @IsString()
    description;
}
export class CreateOrderDto {
    @IsString()
    name;
    @IsString()
    table_number;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orders;
}
