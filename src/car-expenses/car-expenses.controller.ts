import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarExpensesService } from './car-expenses.service';
import { CreateCarExpenseDto } from './dto/create-car-expense.dto';
import { UpdateCarExpenseDto } from './dto/update-car-expense.dto';
import { Roles, UserRole } from '../app.constants';
import { RolesGuard } from '../common/guards/role.guard';

@Controller('car-expenses')
@UseGuards(RolesGuard)
export class CarExpensesController {
  constructor(private readonly carExpensesService: CarExpensesService) {}

  @Post()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  create(@Body() createCarExpenseDto: CreateCarExpenseDto) {
    return this.carExpensesService.create(createCarExpenseDto);
  }

  @Get()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  findAll() {
    return this.carExpensesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.carExpensesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateCarExpenseDto: UpdateCarExpenseDto) {
    return this.carExpensesService.update(+id, updateCarExpenseDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.carExpensesService.remove(+id);
  }
}
