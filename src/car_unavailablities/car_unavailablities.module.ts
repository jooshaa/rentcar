import { Module } from '@nestjs/common';
import { CarUnavailablitiesService } from './car_unavailablities.service';
import { CarUnavailablitiesController } from './car_unavailablities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarUnavailablity } from './entities/car_unavailablity.entity';

@Module({
  imports : [TypeOrmModule.forFeature([CarUnavailablity])],
  controllers: [CarUnavailablitiesController],
  providers: [CarUnavailablitiesService],
})
export class CarUnavailablitiesModule {}
