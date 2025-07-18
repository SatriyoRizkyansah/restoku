import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [DatabaseModule],
})
export class OrderModule {}
