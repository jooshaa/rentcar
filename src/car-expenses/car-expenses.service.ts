import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarExpenseDto } from './dto/create-car-expense.dto';
import { UpdateCarExpenseDto } from './dto/update-car-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarExpense } from './entities/car-expense.entity';


@Injectable()
export class CarExpensesService {
  constructor(
    @InjectRepository(CarExpense)
    private readonly carExpense: Repository<CarExpense>
  ) { }

  async create(createCarExpenseDto: CreateCarExpenseDto) {
    const car = this.carExpense.create({
      ...createCarExpenseDto,
      car: { id: createCarExpenseDto.car_id }
    })
    return await this.carExpense.save(car)
  }

  async findAll() {
    return this.carExpense.find({
      relations: ["car"],
      select: {
        car: {
          id: true,
          number_plate: true
        }
      }
    })
  }

  async findOne(id: number) {
    const carExpense = await this.carExpense.findOne({
      where: { id },
      relations: ["car"],
      select: {
        car: {
          id: true,
          number_plate: true
        }
      }
    })
    if (!carExpense) {
      throw new NotFoundException("not found")
    }
    return carExpense
  }

  async update(id: number, updateCarExpenseDto: UpdateCarExpenseDto) {
    const carExpense = await this.findOne(id);
    Object.assign(carExpense, updateCarExpenseDto)
    return await this.carExpense.save(carExpense)
  }

  async remove(id: number) {
    const carExpense = await this.findOne(id);
    await this.carExpense.remove(carExpense)
    return { message: "car-carExpense deleted" }
  }
}
