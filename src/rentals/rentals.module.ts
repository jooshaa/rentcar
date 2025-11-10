import { forwardRef, Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { CarModule } from '../car/car.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), CarModule, forwardRef(()=>PaymentsModule) ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService]
})
export class RentalsModule {}
