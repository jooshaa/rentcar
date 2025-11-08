import { Module } from '@nestjs/common';
import { CarExpensesService } from './car-expenses.service';
import { CarExpensesController } from './car-expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarExpense } from './entities/car-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarExpense])],
  controllers: [CarExpensesController],
  providers: [CarExpensesService],
})
export class CarExpensesModule {}
