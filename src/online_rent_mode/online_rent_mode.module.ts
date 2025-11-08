import { Module } from '@nestjs/common';
import { OnlineRentModeService } from './online_rent_mode.service';
import { OnlineRentModeController } from './online_rent_mode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineRentMode } from './entities/online_rent_mode.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([OnlineRentMode])],
  controllers: [OnlineRentModeController],
  providers: [OnlineRentModeService],
})
export class OnlineRentModeModule {}
