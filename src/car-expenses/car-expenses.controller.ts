import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarExpensesService } from './car-expenses.service';
import { CreateCarExpenseDto } from './dto/create-car-expense.dto';
import { UpdateCarExpenseDto } from './dto/update-car-expense.dto';

@Controller('car-expenses')
export class CarExpensesController {
  constructor(private readonly carExpensesService: CarExpensesService) {}

  @Post()
  create(@Body() createCarExpenseDto: CreateCarExpenseDto) {
    return this.carExpensesService.create(createCarExpenseDto);
  }

  @Get()
  findAll() {
    return this.carExpensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carExpensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarExpenseDto: UpdateCarExpenseDto) {
    return this.carExpensesService.update(+id, updateCarExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carExpensesService.remove(+id);
  }
}
