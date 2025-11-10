import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepo: Repository<Car>
  ) { }

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepo.create({
      ...createCarDto,
      branch: { id: createCarDto.branch_id },
      carModel: { id: createCarDto.model_id }
    })
    return await this.carRepo.save(car)
  }

  async findAll() {
    return this.carRepo.find({
      relations: ["carModel", "branch"],
      select: {
        id: true,
        number_plate: true,
        photo: true,
        state: true,
        per_day_price: true,
        next_available_at: true,
        branch: { name: true, address: true , phone: true},
        carModel: {
          id: true,
          name: true,
          car_type: true,
          seats: true,
          fuel_type: true,
        }
      },

    })
  }

  async findOne(id: number) {
    const branch = await this.carRepo.findOne({
      where: { id },
      relations: ["carModel", "branch"],
      select: {
        id: true,
        number_plate: true,
        branch: { name: true, address: true, phone: true },
        per_day_price: true, 
        next_available_at: true,
        carModel: {
          id: true,
          name: true,
          car_type: true,
          seats: true,
          fuel_type: true
        }
      },
    })
    if (!branch) {
      throw new NotFoundException("not found")
    }
    return branch
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const branch = await this.findOne(id);
    Object.assign(branch, updateCarDto)
    return await this.carRepo.save(branch)
  }

  async remove(id: number) {
    const branch = await this.findOne(id);
    await this.carRepo.remove(branch)
    return { message: "car-branch deleted" }
  }
}
