import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { RentalsModule } from '../rentals/rentals.module';
import { CarModule } from '../car/car.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), forwardRef(() => RentalsModule), CarModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
